/**
 * Página de solicitud de activación de negocio.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activar mi negocio",
  description: "Solicita la activación de tu negocio en WebLine.",
};

export default function ActivatePage() {
  return (
    <div className="container mx-auto max-w-2xl py-16 px-4">
      <h1 className="text-3xl font-bold tracking-tight">
        Activa tu negocio en WebLine
      </h1>
      <p className="text-muted-foreground mt-2">
        Completa el formulario para comenzar a gestionar tus reservas.
      </p>
      {/* TODO: <ActivationWizard /> de features/activation */}
    </div>
  );
}
