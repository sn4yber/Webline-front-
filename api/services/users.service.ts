/**
 * Servicio de usuarios (admin).
 */

import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { User } from "@/types/auth.types";
import type { ApiResponse, PaginatedResponse, SearchParams } from "@/types/api.types";

export const usersService = {
  list(params?: SearchParams) {
    return apiClient.get<PaginatedResponse<User>>(endpoints.users.list, {
      params,
    });
  },

  getById(id: string) {
    return apiClient.get<ApiResponse<User>>(endpoints.users.byId(id));
  },
};
