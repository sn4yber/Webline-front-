/**
 * Servicio de planes y entitlements.
 */

import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { Plan, Entitlement, CreatePlanRequest } from "@/types/plan.types";
import type { ApiResponse, PaginatedResponse, SearchParams } from "@/types/api.types";

export const plansService = {
  list(params?: SearchParams) {
    return apiClient.get<PaginatedResponse<Plan>>(endpoints.plans.list, {
      params,
    });
  },

  getById(id: string) {
    return apiClient.get<ApiResponse<Plan>>(endpoints.plans.byId(id));
  },

  create(data: CreatePlanRequest) {
    return apiClient.post<ApiResponse<Plan>>(endpoints.plans.create, data);
  },

  listEntitlements() {
    return apiClient.get<ApiResponse<Entitlement[]>>(endpoints.plans.entitlements);
  },
};
