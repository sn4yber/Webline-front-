"use client";

/**
 * Composición de todos los providers de la app.
 * Se monta una sola vez en el root layout.
 */

import type { ReactNode } from "react";
import { QueryProvider } from "./query-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      {/* Agregar AuthProvider, ThemeProvider, etc. aquí */}
      {children}
    </QueryProvider>
  );
}
