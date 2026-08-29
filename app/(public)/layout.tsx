/**
 * Layout del grupo de rutas públicas (landing, activate).
 * Sin sidebar, sin auth requerido.
 */

import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* TODO: Navbar pública */}
      <main className="flex-1">{children}</main>
      {/* TODO: Footer */}
    </div>
  );
}
