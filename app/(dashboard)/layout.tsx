/**
 * Layout del grupo de rutas del dashboard (negocio autenticado).
 * Incluye sidebar + protección de auth.
 */

import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* TODO: <Sidebar /> de shared/layouts */}
      <aside className="hidden w-64 border-r bg-sidebar lg:block">
        <div className="p-4 font-bold text-lg">WebLine</div>
        {/* TODO: Navigation items */}
      </aside>
      <main className="flex-1 p-6 lg:p-8">{children}</main>
    </div>
  );
}
