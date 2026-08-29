"use client";

/**
 * AuthProvider — Contexto de sesión del usuario.
 *
 * Provee estado de autenticación a todo el árbol de componentes.
 * Se alimenta del endpoint /auth/me del backend.
 */

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useCurrentUser } from "@/api/queries/use-auth-queries";
import type { User } from "@/types/auth.types";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  isAdmin: false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useCurrentUser();
  const user = data?.data ?? null;

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "SUPER_ADMIN",
  };

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
