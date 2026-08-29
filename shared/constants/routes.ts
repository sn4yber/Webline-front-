/**
 * Mapa centralizado de rutas de la aplicación.
 * Evita strings hardcodeados de rutas por todo el codebase.
 */

export const routes = {
  // ── Public ───────────────────────────────────────────
  home: "/",
  activate: "/activate",

  // ── Auth ─────────────────────────────────────────────
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",

  // ── Dashboard (negocio autenticado) ──────────────────
  dashboard: {
    root: "/dashboard",
    appointments: "/dashboard/appointments",
    clients: "/dashboard/clients",
    settings: "/dashboard/settings",
  },

  // ── Super Admin ──────────────────────────────────────
  admin: {
    root: "/admin",
    businesses: "/admin/businesses",
    plans: "/admin/plans",
    users: "/admin/users",
  },

  // ── Portal público de reservas ───────────────────────
  booking: {
    business: (slug: string) => `/${slug}`,
    service: (slug: string, serviceId: string) =>
      `/${slug}/book/${serviceId}`,
  },
} as const;
