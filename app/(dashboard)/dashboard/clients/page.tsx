/**
 * Página de gestión de clientes.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clientes",
};

export default function ClientsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Clientes</h1>
      <p className="text-muted-foreground mt-1">
        Directorio de clientes de tu negocio.
      </p>
      {/* TODO: <ClientList /> de features/dashboard/clients */}
    </div>
  );
}
