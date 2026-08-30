# ⚡ WebLine — Plataforma Web Pública & Panel Administrativo

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-black?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Estilo](https://img.shields.io/badge/Estética-Brutalismo_Estricto-blue?style=for-the-badge)](#-diseño-y-estética-brutalista)

**WebLine** es la infraestructura digital invisible diseñada para automatizar la operación, reservas y gestión de negocios locales (barberías, tatuadores, consultorios, clínicas, estéticas y estudios creativos).

Este repositorio abarca tanto la **Landing Page Pública de Captación y Registro** como el **Panel de Administración (SuperAdmin)**.

---

## 🌐 1. Landing Page Pública (`/`)

La Landing Page pública está diseñada bajo un estilo **Brutalista Neo-Editorial** y **Glassmorphism**, orientada a convertir visitantes en clientes sin fricción.

### 🎯 Secciones y Funcionalidades:
- **Hero Section ("Tu negocio en piloto automático"):**
  - Presenta la propuesta de valor: eliminar la pérdida de tiempo entre libretas físicas e chats de WhatsApp.
  - Arte tipográfico exclusivo y llamados a la acción directos para unirse.
- **El Manifiesto (`#manifiesto`):**
  - Tarjeta con efecto *Liquid Glass* (cristal líquido y desenfoque) sobre fondos fotográficos dinámicos.
  - Declaración contra el caos de la fragmentación operativa en negocios locales.
- **Flujo Cero Fricción (`#como-funciona`):**
  - **01. Configuras:** Servicios, empleados y horarios.
  - **02. Publicas:** Enlace único y código QR listo para Instagram, WhatsApp o local físico.
  - **03. Reservan:** El cliente agenda en segundos sin descargar aplicaciones ni crear contraseñas.
- **Planes Transparentes (`#pricing`):**
  - **Plan Starter ($65.000 COP/mes):** Hasta 3 empleados, 1 sucursal, agenda pública, link/QR de reserva.
  - **Plan Pro ($100.000 COP/mes - 15 días gratis):** Hasta 15 empleados, 3 sucursales, historial de clientes recurrentes, cancelaciones y reprogramaciones.
- **Marquesina Infinita:** Animación fluida de sectores atendidos (*Barberías, Tatuadores, Consultorios, Salones de Belleza, etc.*).

---

## 📝 2. Portal de Solicitud de Activación (`/activate`)

Página de registro directo para propietarios de negocios interesados en sumarse a WebLine:
- **Formulario Dinámico:** Captura datos del negocio (nombre, propietario, email, teléfono) preseleccionando el plan deseado (`Starter` o `Pro`).
- **Conexión con Backend:** Envía la solicitud al endpoint público `POST /api/v1/solicitudes-activacion`.
- **Pantalla de Confirmación:** Confirmación brutalista con feedback visual inmediato para el usuario.

---

## 🛡️ 3. Panel de Administración (`/admin`)

El centro de control administrativo para el SuperAdmin de WebLine:

### 📱 Flujo de Activación Móvil de Un Solo Uso (Single-Use 8-Char Code)
- **Aprobación de Solicitudes:** Al aprobar una solicitud desde `/admin/requests`, el backend genera y devuelve un **Código de Activación Móvil de 8 caracteres** (`A-Z, 2-9`) de uso único, válido por 72 horas.
- **Modal de Activación Móvil:**
  - 📋 **Copiar Código:** Copia el código al portapapeles con un clic.
  - 💬 **Enviar por WhatsApp:** Enlace directo a WhatsApp con el mensaje pre-diligenciado listo para entregar al cliente.
- **Rotación de Códigos (`rotarCodigo`):** Posibilidad de regenerar un código vencido directamente desde la tabla mediante `POST /api/v1/admin/invitaciones/{id}/codigo/rotar`.

### 🏢 Gestión de Negocios, Usuarios y Planes
- **Negocios (`/admin/businesses`):** Onboarding asistido con modales que evitan registros inconsistentes.
- **Planes (`/admin/plans`):** Configuración de precios, estados y entitlements.
- **Analíticas & KPIs (`/admin`):** Métricas de solicitudes pendientes, negocios activos e ingresos globales con gráficos `Recharts` adaptados al modo oscuro brutalista (`fill-white/5`).

---

## 🎨 Diseño y Estética Brutalista

WebLine implementa un lenguaje visual brutalista estricto:
- **Fondo Absoluto:** `#000000` (Modo Oscuro) / Fondos de alto contraste.
- **Bordes Marcados:** Líneas de definición ultra-nítidas (`border-4`, `border-white/10`).
- **Paleta de Colores Curada:**
  - 🟦 **WebLine Blue:** `#0033cc`
  - 🟩 **Verde Éxito:** `#16a34a` / `#22c55e`
  - 🟧 **Ámbar Advertencia:** `#d97706` / `#f59e0b`
  - 🟥 **Rojo Alerta:** `#dc2626` / `#ef4444`
- **Tipografía:** Tipografías Syne/Space Grotesk para titulares y fuentes monoespaciadas (`font-mono`) en badges, códigos de activación y datos numéricos.

---

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 14+ (App Router)
- **Lenguaje:** TypeScript (Strict Mode)
- **Estilos:** Tailwind CSS
- **Iconografía:** `lucide-react`
- **Visualización de Datos:** `recharts`
- **Cliente HTTP:** Custom `apiClient` con interceptores, CSRF y tokens JWT.

---

## 📁 Estructura del Proyecto

```text
webline-web/
├── api/
│   ├── client.ts             # Cliente Axios configurado con interceptores
│   ├── endpoints.ts          # Matriz centralizada de rutas de la API backend
│   └── services/             # Servicios por dominio (admin, negocios, etc.)
├── app/
│   ├── (admin)/              # Panel Administrativo
│   │   ├── admin/
│   │   │   ├── businesses/   # Gestión de negocios
│   │   │   ├── plans/        # Gestión de planes
│   │   │   ├── requests/     # Solicitudes & Modal de Código Móvil
│   │   │   ├── users/        # Usuarios y roles
│   │   │   └── page.tsx      # Dashboard Principal & Analytics
│   ├── (public)/             # Rutas Públicas
│   │   ├── activate/         # Formulario público de solicitud
│   │   ├── layout.tsx        # Layout público
│   │   └── page.tsx          # Landing Page Principal
│   ├── layout.tsx            # Root Layout
│   └── page.tsx              # Redirección principal
├── components/
│   ├── ui/                   # Componentes UI (Button, Table, Card, Chart, etc.)
│   └── admin/                # Componentes específicos de administración
├── types/
│   └── admin.types.ts        # Definiciones TypeScript de la API Admin
└── public/
    └── images/               # Branding oficial (wb3.png, wb4.png, wb5.jpg, etc.)
```

---

## 🔌 API Matrix

| Categoría | Método | Ruta | Descripción |
| :--- | :--- | :--- | :--- |
| **Público** | `POST` | `/api/v1/solicitudes-activacion` | Envía una nueva solicitud de activación desde el registro público |
| **Público** | `GET` | `/api/v1/planes` | Lista de planes disponibles para contratación |
| **Admin Solicitudes**| `GET` | `/api/v1/admin/solicitudes-activacion` | Lista de solicitudes enviadas por clientes |
| **Admin Solicitudes**| `POST` | `/api/v1/admin/solicitudes-activacion/{id}/aprobar` | Aprueba solicitud y genera el `codigoActivacion` móvil |
| **Admin Solicitudes**| `POST` | `/api/v1/admin/solicitudes-activacion/{id}/rechazar` | Rechaza una solicitud pendiente |
| **Admin Invitaciones**| `POST` | `/api/v1/admin/invitaciones/{id}/codigo/rotar` | Genera un nuevo código de activación para el negocio |
| **Admin Negocios** | `GET` | `/api/v1/admin/negocios` | Lista de negocios registrados |


```



---

*Desarrollado con ❤️ y Brutalismo por **SN4** para la plataforma **WebLine**.*
