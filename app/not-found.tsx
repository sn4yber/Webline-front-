/**
 * Página 404 global.
 */

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="text-muted-foreground mt-4 text-lg">
        La página que buscas no existe.
      </p>
      <Link
        href="/"
        className="mt-6 text-sm underline underline-offset-4 hover:text-primary"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
