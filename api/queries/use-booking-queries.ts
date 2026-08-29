/**
 * TanStack Query hooks para el portal público de reservas.
 */

import { useMutation, useQuery } from "@tanstack/react-query";
import { bookingService } from "@/api/services/booking.service";
import type { BookingRequest } from "@/types/booking.types";

export const bookingKeys = {
  all: ["booking"] as const,
  profile: (slug: string) => [...bookingKeys.all, "profile", slug] as const,
  services: (slug: string) => [...bookingKeys.all, "services", slug] as const,
  availability: (slug: string, serviceId: string, date?: string) =>
    [...bookingKeys.all, "availability", slug, serviceId, date] as const,
};

export function usePublicBusinessProfile(slug: string) {
  return useQuery({
    queryKey: bookingKeys.profile(slug),
    queryFn: () => bookingService.getProfile(slug),
    enabled: !!slug,
  });
}

export function usePublicServices(slug: string) {
  return useQuery({
    queryKey: bookingKeys.services(slug),
    queryFn: () => bookingService.getServices(slug),
    enabled: !!slug,
  });
}

export function useAvailability(
  slug: string,
  serviceId: string,
  date?: string
) {
  return useQuery({
    queryKey: bookingKeys.availability(slug, serviceId, date),
    queryFn: () => bookingService.getAvailability(slug, serviceId, date),
    enabled: !!slug && !!serviceId,
  });
}

export function useBookSlot(slug: string) {
  return useMutation({
    mutationFn: (data: BookingRequest) => bookingService.book(slug, data),
  });
}
