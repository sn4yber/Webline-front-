/**
 * Formateo de valores. Funciones puras sin side effects.
 */

/**
 * Formatea una fecha ISO a formato legible.
 */
export function formatDate(
  isoDate: string,
  locale: string = "es-CO",
  options?: Intl.DateTimeFormatOptions
): string {
  return new Date(isoDate).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  });
}

/**
 * Formatea una fecha ISO a hora legible.
 */
export function formatTime(
  isoDate: string,
  locale: string = "es-CO"
): string {
  return new Date(isoDate).toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Formatea un valor monetario.
 */
export function formatCurrency(
  amount: number,
  currency: string = "COP",
  locale: string = "es-CO"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formatea duración en minutos a texto legible.
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return remaining > 0 ? `${hours}h ${remaining}min` : `${hours}h`;
}
