/**
 * Dashboard overview page.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground mt-1">
        Resumen general de tu negocio.
      </p>
      {/* TODO: <DashboardOverview /> de features/dashboard/overview */}
    </div>
  );
}
