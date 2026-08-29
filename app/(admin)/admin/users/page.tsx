/**
 * Página de gestión de usuarios (admin).
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usuarios",
};

export default function AdminUsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Usuarios</h1>
      <p className="text-muted-foreground mt-1">
        Todos los usuarios de la plataforma.
      </p>
      {/* TODO: <UserList /> de features/admin/users */}
    </div>
  );
}
