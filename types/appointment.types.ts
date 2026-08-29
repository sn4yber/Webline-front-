/**
 * Tipos del dominio de citas/appointments.
 */

export type AppointmentStatus =
  | "SCHEDULED"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export interface Appointment {
  id: string;
  businessId: string;
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  employeeId?: string;
  employeeName?: string;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
}

export interface CreateAppointmentRequest {
  serviceId: string;
  employeeId?: string;
  startTime: string;
  notes?: string;
}
