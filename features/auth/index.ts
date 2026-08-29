/**
 * Feature: Auth — barrel export.
 *
 * Componentes de autenticación: LoginForm, RegisterForm, guards.
 */

export { AuthProvider, useAuth } from "./context";
export { ProtectedRoute, AdminRoute } from "./guards";
