/**
 * Tipos internos de la feature de booking portal.
 */

export interface BookingFormValues {
  serviceId: string;
  selectedDate: string;
  selectedSlot: string;
  employeeId?: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  notes?: string;
}

export type BookingStep = "service" | "date" | "details" | "confirmation";
