/**
 * Cliente HTTP central para comunicación con la API Spring Boot.
 *
 * - Inyecta automáticamente el token de auth.
 * - Maneja refresh de tokens.
 * - Parsea errores al formato estándar ApiError.
 * - Todas las llamadas del frontend pasan por aquí.
 */

import { env } from "@/config/env";
import type { ApiError } from "@/types/api.types";

type RequestConfig = Omit<RequestInit, "body"> & {
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
};

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }



  private buildUrl(path: string, params?: RequestConfig["params"]): string {
    const url = new URL(path, this.baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      });
    }
    return url.toString();
  }

  private async getCsrfToken(): Promise<string | null> {
    try {
      const response = await fetch(this.buildUrl('/api/v1/auth/csrf'), {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        return data.token;
      }
    } catch (e) {
      console.warn("No se pudo obtener el token CSRF", e);
    }
    return null;
  }

  private async request<T>(
    method: string,
    path: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { body, params, headers: customHeaders, ...restConfig } = config;

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...((customHeaders as Record<string, string>) ?? {}),
    };

    // Ya no se usa Authorization JWT, usamos sesiones directas (cookies).

    if (method !== "GET" && method !== "HEAD") {
      const csrf = await this.getCsrfToken();
      if (csrf) {
        headers["X-XSRF-TOKEN"] = csrf;
      }
    }

    const response = await fetch(this.buildUrl(path, params), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
      ...restConfig,
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        status: response.status,
        error: response.statusText,
        message: "Error de conexión con el servidor",
        timestamp: new Date().toISOString(),
      }));

      if (response.status === 401) {
        // Si recibimos 401, la sesión expiró o es inválida
        if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin") && !window.location.pathname.includes("/admin/login")) {
          // Limpiamos la cookie de JSESSIONID (solo funciona si no es HttpOnly, pero el backend manda HttpOnly)
          // Lo mejor es forzar la redirección para que el usuario inicie sesión de nuevo
          window.location.href = "/admin/login?clear=1";
        }
      }

      // TODO: manejar otros errores globales
      throw error;
    }

    // 204 No Content
    if (response.status === 204) return undefined as T;

    return response.json() as Promise<T>;
  }

  async get<T>(path: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("GET", path, config);
  }

  async post<T>(path: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>("POST", path, { ...config, body });
  }

  async put<T>(path: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>("PUT", path, { ...config, body });
  }

  async patch<T>(path: string, body?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>("PATCH", path, { ...config, body });
  }

  async delete<T>(path: string, config?: RequestConfig): Promise<T> {
    return this.request<T>("DELETE", path, config);
  }
}

export const apiClient = new ApiClient(env.API_BASE_URL);
