/**
 * Página de gestión de negocios (admin).
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Negocios",
};

export default function AdminBusinessesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Negocios</h1>
      <p className="text-muted-foreground mt-1">
        Todos los negocios registrados en la plataforma.
      </p>
      {/* TODO: <BusinessList /> de features/admin/businesses */}
    </div>
  );
}
