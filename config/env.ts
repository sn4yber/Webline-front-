/**
 * Variables de entorno tipadas y validadas.
 * Centraliza el acceso para evitar `process.env` desperdigado por el codebase.
 */

function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
  return value;
}

export const env = {
  /** URL base de la API Spring Boot */
  API_BASE_URL: getEnvVar("NEXT_PUBLIC_API_BASE_URL", "http://localhost:8080"),

  /** Nombre del entorno actual */
  NODE_ENV: getEnvVar("NODE_ENV", "development"),

  /** URL pública del frontend */
  APP_URL: getEnvVar("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),

  /** Flag: ¿estamos en desarrollo? */
  get isDev() {
    return this.NODE_ENV === "development";
  },

  /** Flag: ¿estamos en producción? */
  get isProd() {
    return this.NODE_ENV === "production";
  },
} as const;
