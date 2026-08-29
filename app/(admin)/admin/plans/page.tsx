/**
 * Página de gestión de planes (admin).
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planes",
};

export default function AdminPlansPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Planes</h1>
      <p className="text-muted-foreground mt-1">
        Gestión de planes y entitlements de la plataforma.
      </p>
      {/* TODO: <PlanList /> de features/admin/plans */}
    </div>
  );
}
