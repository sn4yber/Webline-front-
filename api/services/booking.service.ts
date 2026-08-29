/**
 * Servicio del portal público de reservas.
 */

import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type {
  PublicBusinessProfile,
  PublicService,
  AvailableSlot,
  BookingRequest,
  BookingConfirmation,
} from "@/types/booking.types";
import type { ApiResponse } from "@/types/api.types";

export const bookingService = {
  getProfile(slug: string) {
    return apiClient.get<ApiResponse<PublicBusinessProfile>>(
      endpoints.booking.profile(slug)
    );
  },

  getServices(slug: string) {
    return apiClient.get<ApiResponse<PublicService[]>>(
      endpoints.booking.services(slug)
    );
  },

  getAvailability(slug: string, serviceId: string, date?: string) {
    return apiClient.get<ApiResponse<AvailableSlot[]>>(
      endpoints.booking.availability(slug, serviceId),
      { params: { date } }
    );
  },

  book(slug: string, data: BookingRequest) {
    return apiClient.post<ApiResponse<BookingConfirmation>>(
      endpoints.booking.book(slug),
      data
    );
  },
};
