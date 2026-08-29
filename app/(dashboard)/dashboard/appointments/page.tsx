/**
 * Página de gestión de citas.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Citas",
};

export default function AppointmentsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Citas</h1>
      <p className="text-muted-foreground mt-1">
        Gestiona las citas de tu negocio.
      </p>
      {/* TODO: <AppointmentList /> de features/dashboard/appointments */}
    </div>
  );
}
