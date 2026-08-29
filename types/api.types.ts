/**
 * Tipos genéricos para las respuestas de la API Spring Boot.
 * Estos wrappean las respuestas reales y definen la forma estándar.
 */

/** Respuesta exitosa genérica del backend */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp: string;
}

/** Respuesta paginada del backend */
export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // página actual (0-indexed)
  first: boolean;
  last: boolean;
  empty: boolean;
}

/** Error estándar del backend */
export interface ApiError {
  status: number;
  error: string;
  message: string;
  path?: string;
  timestamp: string;
  validationErrors?: Record<string, string[]>;
}

/** Params genéricos de paginación para requests */
export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
  direction?: "asc" | "desc";
}

/** Params genéricos de filtrado */
export interface SearchParams extends PaginationParams {
  q?: string;
}
