/**
 * TanStack Query hooks para citas/appointments.
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { appointmentsService } from "@/api/services/appointments.service";
import type { CreateAppointmentRequest } from "@/types/appointment.types";
import type { SearchParams } from "@/types/api.types";

export const appointmentKeys = {
  all: ["appointments"] as const,
  lists: () => [...appointmentKeys.all, "list"] as const,
  list: (params?: SearchParams) =>
    [...appointmentKeys.lists(), params] as const,
  details: () => [...appointmentKeys.all, "detail"] as const,
  detail: (id: string) => [...appointmentKeys.details(), id] as const,
};

export function useAppointments(params?: SearchParams) {
  return useQuery({
    queryKey: appointmentKeys.list(params),
    queryFn: () => appointmentsService.list(params),
  });
}

export function useAppointment(id: string) {
  return useQuery({
    queryKey: appointmentKeys.detail(id),
    queryFn: () => appointmentsService.getById(id),
    enabled: !!id,
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAppointmentRequest) =>
      appointmentsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() });
    },
  });
}

export function useCancelAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => appointmentsService.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() });
    },
  });
}
