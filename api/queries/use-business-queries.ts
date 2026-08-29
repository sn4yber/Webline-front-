/**
 * TanStack Query hooks para negocios.
 */

import { useQuery } from "@tanstack/react-query";
import { businessesService } from "@/api/services/businesses.service";
import type { SearchParams } from "@/types/api.types";

export const businessKeys = {
  all: ["businesses"] as const,
  lists: () => [...businessKeys.all, "list"] as const,
  list: (params?: SearchParams) => [...businessKeys.lists(), params] as const,
  details: () => [...businessKeys.all, "detail"] as const,
  detail: (id: string) => [...businessKeys.details(), id] as const,
  slug: (slug: string) => [...businessKeys.all, "slug", slug] as const,
};

export function useBusinesses(params?: SearchParams) {
  return useQuery({
    queryKey: businessKeys.list(params),
    queryFn: () => businessesService.list(params),
  });
}

export function useBusiness(id: string) {
  return useQuery({
    queryKey: businessKeys.detail(id),
    queryFn: () => businessesService.getById(id),
    enabled: !!id,
  });
}

export function useBusinessBySlug(slug: string) {
  return useQuery({
    queryKey: businessKeys.slug(slug),
    queryFn: () => businessesService.getBySlug(slug),
    enabled: !!slug,
  });
}
