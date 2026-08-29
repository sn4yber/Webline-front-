/**
 * Landing page — página principal pública.
 */

import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Inicio | ${siteConfig.name}`,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <h1 className="text-4xl font-bold tracking-tight font-heading sm:text-6xl">
        Gestiona tu negocio.
        <br />
        <span className="text-primary">Simplifica tus reservas.</span>
      </h1>
      <p className="text-muted-foreground mt-6 max-w-2xl text-lg">
        La plataforma todo-en-uno para negocios de servicios. Agenda, clientes,
        pagos y más.
      </p>
      {/* TODO: CTA buttons, features section, pricing preview */}
    </div>
  );
}
