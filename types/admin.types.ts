/**
 * Tipos de la API del panel de administración WebLine.
 */

export interface AdminUser {
  usuarioId: string;
  username: string;
  roles: string[];
  negocioId: string | null;
}

export interface Plan {
  id: string;
  codigo: string;
  nombre: string;
  precio: number | null;
  moneda: string;
  periodoFacturacion: "MENSUAL" | "ANUAL";
  activo: boolean;
  publicado: boolean;
  planPrueba: boolean;
  creadoEn: string;
  actualizadoEn: string;
}

export interface SolicitudActivacion {
  id: string;
  emailPropietario: string;
  nombrePropietario: string;
  apellidoPropietario: string;
  telefonoPropietario: string | null;
  nombreNegocio: string;
  tipoNegocio: string;
  planId: string | null;
  estado: "PENDIENTE" | "APROBADA" | "RECHAZADA";
  notasSolicitante: string | null;
  notasRevision: string | null;
  negocioId: string | null;
  invitacionId?: string | null;
  codigoActivacion?: string | null;
  revisadaPor: string | null;
  revisadaEn: string | null;
  creadoEn: string;
  actualizadoEn: string;
}

export interface Negocio {
  id: string;
  nombre: string;
  slug?: string;
  estado: "ACTIVO" | "SUSPENDIDO" | "INACTIVO" | string;
  creadoEn: string;
}

export interface Usuario {
  id: string;
  email: string;
  nombre: string;
  estado: "ACTIVO" | "BLOQUEADO" | "INACTIVO" | string;
  roles?: string[];
  creadoEn: string;
}
