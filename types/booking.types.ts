/**
 * Tipos del portal público de reservas.
 */

export interface PublicBusinessProfile {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoUrl?: string;
  coverUrl?: string;
  address?: string;
  phone?: string;
}

export interface PublicService {
  id: string;
  name: string;
  description?: string;
  durationMinutes: number;
  price: number;
  currency: string;
  imageUrl?: string;
}

export interface AvailableSlot {
  startTime: string;
  endTime: string;
  employeeId?: string;
  employeeName?: string;
}

export interface BookingRequest {
  serviceId: string;
  slotStartTime: string;
  employeeId?: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  notes?: string;
}

export interface BookingConfirmation {
  id: string;
  confirmationCode: string;
  serviceName: string;
  startTime: string;
  endTime: string;
  businessName: string;
}
