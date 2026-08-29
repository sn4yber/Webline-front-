/**
 * Layout del portal público de reservas.
 * Multi-tenant: cada negocio tiene su slug.
 */

import type { ReactNode } from "react";

export default function BookingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20">
      <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
    </div>
  );
}
