/**
 * Layout del grupo de rutas de Super Admin.
 * Layout independiente del dashboard de negocio.
 */

import type { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 border-r bg-sidebar lg:block">
        <div className="p-4 font-bold text-lg">WebLine Admin</div>
        {/* TODO: Admin navigation items */}
      </aside>
      <main className="flex-1 p-6 lg:p-8">{children}</main>
    </div>
  );
}
