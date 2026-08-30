/**
 * Layout del grupo de rutas de Super Admin.
 * Sidebar oscuro + contenido principal.
 */

import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full min-h-screen relative bg-black font-mono text-white">
      {/* Sello WebLine de fondo (Branding) */}
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] opacity-20 pointer-events-none z-0">
        <img 
          src="/images/wb6.png" 
          alt="WebLine Stamp" 
          className="w-full h-full object-contain object-bottom right-0 absolute"
        />
      </div>

      <AdminSidebar />
      <main className="flex-1 overflow-auto relative z-10">{children}</main>
    </div>
  );
}
