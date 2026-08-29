"use client";

/**
 * Route guards para protección de rutas en el cliente.
 *
 * Nota: La protección real se hace en middleware.ts (edge).
 * Estos guards son para UX: mostrar loading/redirect en el cliente.
 */

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "./context";
import { routes } from "@/shared/constants/routes";
import { LoadingSkeleton } from "@/shared/components/loading-skeleton";

interface GuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ProtectedRoute({ children, fallback }: GuardProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(routes.login);
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) return fallback ?? <LoadingSkeleton lines={5} />;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}

export function AdminRoute({ children, fallback }: GuardProps) {
  const { isAdmin, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.replace(routes.login);
      } else if (!isAdmin) {
        router.replace(routes.dashboard.root);
      }
    }
  }, [isLoading, isAuthenticated, isAdmin, router]);

  if (isLoading) return fallback ?? <LoadingSkeleton lines={5} />;
  if (!isAdmin) return null;

  return <>{children}</>;
}
