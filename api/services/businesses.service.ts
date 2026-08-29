/**
 * Servicio de negocios.
 */

import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { Business, CreateBusinessRequest } from "@/types/business.types";
import type { ApiResponse, PaginatedResponse, SearchParams } from "@/types/api.types";

export const businessesService = {
  list(params?: SearchParams) {
    return apiClient.get<PaginatedResponse<Business>>(endpoints.businesses.list, {
      params,
    });
  },

  getById(id: string) {
    return apiClient.get<ApiResponse<Business>>(endpoints.businesses.byId(id));
  },

  getBySlug(slug: string) {
    return apiClient.get<ApiResponse<Business>>(endpoints.businesses.bySlug(slug));
  },

  create(data: CreateBusinessRequest) {
    return apiClient.post<ApiResponse<Business>>(endpoints.businesses.create, data);
  },

  activate(data: CreateBusinessRequest) {
    return apiClient.post<ApiResponse<Business>>(endpoints.businesses.activate, data);
  },
};
