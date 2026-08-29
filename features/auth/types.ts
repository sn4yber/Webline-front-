/**
 * Tipos internos de la feature de autenticación.
 */

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
