/**
 * Página de configuración del negocio.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configuración",
};

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Configuración</h1>
      <p className="text-muted-foreground mt-1">
        Ajustes de tu negocio en WebLine.
      </p>
      {/* TODO: Settings forms */}
    </div>
  );
}
