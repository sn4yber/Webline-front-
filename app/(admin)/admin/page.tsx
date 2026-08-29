/**
 * Admin overview page.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel de administración",
};

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">
        Panel de Administración
      </h1>
      <p className="text-muted-foreground mt-1">
        Gestión global de la plataforma WebLine.
      </p>
      {/* TODO: Admin overview stats */}
    </div>
  );
}
