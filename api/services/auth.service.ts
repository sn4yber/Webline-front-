/**
 * Servicio de autenticación.
 * Funciones que llaman al backend y devuelven datos tipados.
 */

import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type {
  AuthTokens,
  LoginRequest,
  RegisterRequest,
  User,
} from "@/types/auth.types";
import type { ApiResponse } from "@/types/api.types";

export const authService = {
  login(data: LoginRequest) {
    return apiClient.post<ApiResponse<AuthTokens>>(endpoints.auth.login, data);
  },

  register(data: RegisterRequest) {
    return apiClient.post<ApiResponse<AuthTokens>>(endpoints.auth.register, data);
  },

  refreshToken(refreshToken: string) {
    return apiClient.post<ApiResponse<AuthTokens>>(endpoints.auth.refresh, {
      refreshToken,
    });
  },

  getMe() {
    return apiClient.get<ApiResponse<User>>(endpoints.auth.me);
  },

  logout() {
    return apiClient.post<void>(endpoints.auth.logout);
  },

  forgotPassword(email: string) {
    return apiClient.post<ApiResponse<{ message: string }>>(
      endpoints.auth.forgotPassword,
      { email }
    );
  },
};
