/**
 * Página de login.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>
      <p className="text-muted-foreground text-center mt-2">
        Ingresa tus credenciales para acceder a tu cuenta.
      </p>
      {/* TODO: <LoginForm /> de features/auth/components */}
    </div>
  );
}
