/**
 * Mapa centralizado de endpoints de la API Spring Boot.
 * Una sola fuente de verdad para todas las URLs del backend.
 */

export const endpoints = {
  // ── Auth ──────────────────────────────────────────────
  auth: {
    login: "/api/v1/auth/login",
    register: "/api/v1/auth/register",
    refresh: "/api/v1/auth/refresh",
    logout: "/api/v1/auth/logout",
    forgotPassword: "/api/v1/auth/forgot-password",
    resetPassword: "/api/v1/auth/reset-password",
    me: "/api/v1/auth/me",
  },

  // ── Businesses ────────────────────────────────────────
  businesses: {
    list: "/api/v1/businesses",
    byId: (id: string) => `/api/v1/businesses/${id}`,
    bySlug: (slug: string) => `/api/v1/businesses/slug/${slug}`,
    create: "/api/v1/businesses",
    activate: "/api/v1/businesses/activate",
  },

  // ── Appointments ──────────────────────────────────────
  appointments: {
    list: "/api/v1/appointments",
    byId: (id: string) => `/api/v1/appointments/${id}`,
    create: "/api/v1/appointments",
    cancel: (id: string) => `/api/v1/appointments/${id}/cancel`,
  },

  // ── Plans & Entitlements ──────────────────────────────
  plans: {
    list: "/api/v1/plans",
    byId: (id: string) => `/api/v1/plans/${id}`,
    create: "/api/v1/plans",
    entitlements: "/api/v1/entitlements",
  },

  // ── Users (Admin) ─────────────────────────────────────
  users: {
    list: "/api/v1/users",
    byId: (id: string) => `/api/v1/users/${id}`,
  },

  // ── Public Booking Portal ─────────────────────────────
  booking: {
    profile: (slug: string) => `/api/v1/public/${slug}`,
    services: (slug: string) => `/api/v1/public/${slug}/services`,
    availability: (slug: string, serviceId: string) =>
      `/api/v1/public/${slug}/services/${serviceId}/availability`,
    book: (slug: string) => `/api/v1/public/${slug}/book`,
  },
} as const;
