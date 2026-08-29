/**
 * Middleware de Next.js — Protección de rutas a nivel edge.
 *
 * Se ejecuta ANTES de renderizar cualquier página.
 * Verifica tokens y redirige si no hay sesión válida.
 */

import { NextResponse, type NextRequest } from "next/server";

/** Rutas que requieren autenticación */
const PROTECTED_PATHS = ["/dashboard", "/admin"];

/** Rutas que NO deben ser accesibles si ya estás autenticado */
const AUTH_PATHS = ["/login", "/register", "/forgot-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("accessToken")?.value;

  const isProtected = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path)
  );
  const isAuthPage = AUTH_PATHS.some((path) => pathname.startsWith(path));

  // No autenticado intentando acceder a ruta protegida → login
  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Autenticado intentando acceder a página de auth → dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // TODO: Verificar rol SUPER_ADMIN para rutas /admin/*

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api (API routes)
     * - _next (Next.js internals)
     * - static files (images, fonts, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|icons|fonts).*)",
  ],
};
