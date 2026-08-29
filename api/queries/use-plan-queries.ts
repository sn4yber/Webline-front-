/**
 * TanStack Query hooks para planes.
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { plansService } from "@/api/services/plans.service";
import type { CreatePlanRequest } from "@/types/plan.types";
import type { SearchParams } from "@/types/api.types";

export const planKeys = {
  all: ["plans"] as const,
  lists: () => [...planKeys.all, "list"] as const,
  list: (params?: SearchParams) => [...planKeys.lists(), params] as const,
  details: () => [...planKeys.all, "detail"] as const,
  detail: (id: string) => [...planKeys.details(), id] as const,
  entitlements: () => [...planKeys.all, "entitlements"] as const,
};

export function usePlans(params?: SearchParams) {
  return useQuery({
    queryKey: planKeys.list(params),
    queryFn: () => plansService.list(params),
  });
}

export function usePlan(id: string) {
  return useQuery({
    queryKey: planKeys.detail(id),
    queryFn: () => plansService.getById(id),
    enabled: !!id,
  });
}

export function useEntitlements() {
  return useQuery({
    queryKey: planKeys.entitlements(),
    queryFn: () => plansService.listEntitlements(),
  });
}

export function useCreatePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePlanRequest) => plansService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: planKeys.lists() });
    },
  });
}
