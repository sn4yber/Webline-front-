/**
 * Página de recuperación de contraseña.
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuperar contraseña",
};

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Recuperar contraseña</h1>
      <p className="text-muted-foreground text-center mt-2">
        Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña.
      </p>
      {/* TODO: <ForgotPasswordForm /> de features/auth/components */}
    </div>
  );
}
