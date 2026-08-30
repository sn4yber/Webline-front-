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
const AUTH_PATHS = ["/admin/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("JSESSIONID")?.value;

  const isProtected = PROTECTED_PATHS.some((path) =>
    pathname.startsWith(path)
  ) && !pathname.startsWith("/admin/login"); // Excluir la página de login del admin
  
  const isAuthPage = AUTH_PATHS.some((path) => pathname.startsWith(path));

  // No autenticado intentando acceder a ruta protegida → admin/login
  if (isProtected && !token) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Si estamos en la página de login y venimos con clear=1, borramos la cookie
  if (isAuthPage && request.nextUrl.searchParams.get("clear") === "1") {
    const response = NextResponse.next();
    response.cookies.delete("JSESSIONID");
    response.cookies.delete("XSRF-TOKEN");
    return response;
  }

  // Autenticado intentando acceder a página de auth → admin
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
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
