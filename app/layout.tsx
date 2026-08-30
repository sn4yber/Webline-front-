import type { Metadata } from "next";
import { Bebas_Neue, Manrope, Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { AppProviders } from "@/providers/app-providers";

// Fuente alta y condensada para titulares (Elegante y brutal)
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

// Fuente limpia y neutral para cuerpo de texto y UI
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Fuente de acento para darle actitud al párrafo del Hero
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-accent",
});

// Fuente exótica y súper moderna para el titular principal del Hero
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-exotic",
  weight: ["700", "800"], // Pesos bold/extrabold para máximo impacto
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(
        "h-full antialiased",
        bebasNeue.variable,
        manrope.variable,
        spaceGrotesk.variable,
        syne.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
