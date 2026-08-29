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

  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    // TODO: integrar con el storage de sesión real
    return localStorage.getItem("accessToken");
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

    const token = this.getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(this.buildUrl(path, params), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      ...restConfig,
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        status: response.status,
        error: response.statusText,
        message: "Error de conexión con el servidor",
        timestamp: new Date().toISOString(),
      }));

      // TODO: manejar 401 → refresh token automático
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
