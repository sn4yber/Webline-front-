/**
 * Mapa centralizado de endpoints de la API Spring Boot.
 * Una sola fuente de verdad para todas las URLs del backend.
 */

export const endpoints = {
  // ── Auth & Sesión ──────────────────────────────────────
  auth: {
    csrf: "/api/v1/auth/csrf", // GET
    login: "/api/v1/auth/login", // POST
    me: "/api/v1/auth/me", // GET
    logout: "/api/v1/auth/logout", // POST
  },

  // ── Público: Onboarding & Planes ────────────────────────
  publico: {
    planes: "/api/v1/planes", // GET
    planBeneficios: (codigo: string) => `/api/v1/planes/${codigo}/beneficios`, // GET
    solicitudesActivacion: "/api/v1/solicitudes-activacion", // POST
    aceptarInvitacion: "/api/v1/invitaciones-propietario/aceptar", // POST
  },

  // ── Público: Reservas & Portal ──────────────────────────
  reservas: {
    negocioPortal: (negocioSlug: string) => `/api/v1/publico/negocios/${negocioSlug}`, // GET
    disponibilidad: (negocioSlug: string) => `/api/v1/publico/negocios/${negocioSlug}/disponibilidad`, // GET
    crearReserva: (negocioSlug: string) => `/api/v1/publico/negocios/${negocioSlug}/reservas`, // POST
    cancelarReserva: (reservaId: string) => `/api/v1/publico/reservas/${reservaId}/cancelacion`, // PATCH
    reprogramarReserva: (reservaId: string) => `/api/v1/publico/reservas/${reservaId}/reprogramacion`, // PUT
  },

  // ── Superadministrador ──────────────────────────────────
  admin: {
    planes: {
      listar: "/api/v1/admin/planes", // GET
      actualizar: (codigo: string) => `/api/v1/admin/planes/${codigo}`, // PUT
      cambiarEstado: (codigo: string) => `/api/v1/admin/planes/${codigo}/estado`, // PATCH
      entitlements: (codigo: string) => `/api/v1/admin/planes/${codigo}/entitlements`, // GET & PUT
    },
    solicitudes: {
      listar: "/api/v1/admin/solicitudes-activacion", // GET
      aprobar: (solicitudId: string) => `/api/v1/admin/solicitudes-activacion/${solicitudId}/aprobar`, // POST
      rechazar: (solicitudId: string) => `/api/v1/admin/solicitudes-activacion/${solicitudId}/rechazar`, // POST
    },
    invitaciones: {
      rotarCodigo: (invitacionId: string) => `/api/v1/admin/invitaciones/${invitacionId}/codigo/rotar`, // POST
    },
    negocios: {
      listar: "/api/v1/admin/negocios", // GET
      crear: "/api/v1/admin/negocios", // POST
      consultar: (negocioId: string) => `/api/v1/admin/negocios/${negocioId}`, // GET
      cambiarEstado: (negocioId: string) => `/api/v1/admin/negocios/${negocioId}/estado`, // PATCH
    },
    usuarios: {
      listar: "/api/v1/admin/usuarios", // GET
      consultar: (usuarioId: string) => `/api/v1/admin/usuarios/${usuarioId}`, // GET
      cambiarEstado: (usuarioId: string) => `/api/v1/admin/usuarios/${usuarioId}/estado`, // PATCH
    },
    suscripciones: {
      listar: "/api/v1/admin/suscripciones", // GET
      consultar: (suscripcionId: string) => `/api/v1/admin/suscripciones/${suscripcionId}`, // GET
      actualizar: (suscripcionId: string) => `/api/v1/admin/suscripciones/${suscripcionId}`, // PUT
    },
    reservas: {
      listar: "/api/v1/admin/reservas", // GET
      consultar: (reservaId: string) => `/api/v1/admin/reservas/${reservaId}`, // GET
      cambiarEstado: (reservaId: string) => `/api/v1/admin/reservas/${reservaId}/estado`, // PATCH
    },
    clientes: {
      listar: "/api/v1/admin/clientes", // GET
      consultar: (clienteId: string) => `/api/v1/admin/clientes/${clienteId}`, // GET
      actualizar: (clienteId: string) => `/api/v1/admin/clientes/${clienteId}`, // PUT
    },
    notificaciones: {
      listar: "/api/v1/admin/notificaciones", // GET
      consultar: (notificacionId: string) => `/api/v1/admin/notificaciones/${notificacionId}`, // GET
      reintentar: (notificacionId: string) => `/api/v1/admin/notificaciones/${notificacionId}/reintentar`, // POST
    }
  }
} as const;
