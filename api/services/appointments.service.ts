/**
 * Servicio de citas/appointments.
 */

import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type {
  Appointment,
  CreateAppointmentRequest,
} from "@/types/appointment.types";
import type { ApiResponse, PaginatedResponse, SearchParams } from "@/types/api.types";

export const appointmentsService = {
  list(params?: SearchParams) {
    return apiClient.get<PaginatedResponse<Appointment>>(
      endpoints.appointments.list,
      { params }
    );
  },

  getById(id: string) {
    return apiClient.get<ApiResponse<Appointment>>(
      endpoints.appointments.byId(id)
    );
  },

  create(data: CreateAppointmentRequest) {
    return apiClient.post<ApiResponse<Appointment>>(
      endpoints.appointments.create,
      data
    );
  },

  cancel(id: string) {
    return apiClient.post<ApiResponse<Appointment>>(
      endpoints.appointments.cancel(id)
    );
  },
};
