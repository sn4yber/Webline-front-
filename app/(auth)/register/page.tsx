/**
 * Página de registro.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear cuenta",
};

export default function RegisterPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Crear cuenta</h1>
      <p className="text-muted-foreground text-center mt-2">
        Regístrate para comenzar a gestionar tu negocio.
      </p>
      {/* TODO: <RegisterForm /> de features/auth/components */}
    </div>
  );
}
