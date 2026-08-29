/**
 * TanStack Query hooks para autenticación.
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/api/services/auth.service";
import type { LoginRequest, RegisterRequest } from "@/types/auth.types";

export const authKeys = {
  all: ["auth"] as const,
  me: () => [...authKeys.all, "me"] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: () => authService.getMe(),
    staleTime: 5 * 60 * 1000, // 5 min
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
    },
  });
}
