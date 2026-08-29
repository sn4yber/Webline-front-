"use client";

/**
 * Error boundary global.
 */

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold">Algo salió mal</h1>
      <p className="text-muted-foreground mt-4 text-lg">
        {error.message || "Ocurrió un error inesperado."}
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90"
      >
        Intentar de nuevo
      </button>
    </div>
  );
}
