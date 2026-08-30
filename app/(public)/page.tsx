/**
 * Landing page — página principal pública.
 */

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { routes } from "@/shared/constants/routes";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: `Inicio | ${siteConfig.name}`,
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar Minimalista - Tema Oscuro */}
      <header className="flex items-center justify-between px-6 py-5 bg-foreground text-background border-b border-background/20 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Image 
            src="/images/wb3.png" 
            alt="WebLine Logo" 
            width={120} 
            height={40}
            className="object-contain w-auto h-auto"
            priority
          />
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#manifiesto" className="font-bold text-sm hover:text-primary transition-colors uppercase tracking-widest">
            Manifiesto
          </a>
          <a href="#como-funciona" className="font-bold text-sm hover:text-primary transition-colors uppercase tracking-widest">
            Flujo
          </a>
          <a href="#pricing" className="font-bold text-sm hover:text-primary transition-colors uppercase tracking-widest">
            Precios
          </a>
        </nav>
        <div className="flex items-center gap-6">
          <a 
            href="#pricing" 
            className={buttonVariants({ 
              className: "rounded-none border border-background shadow-[4px_4px_0px_0px_#f4f4f0] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_#f4f4f0] transition-all bg-primary text-primary-foreground uppercase font-bold tracking-widest px-6" 
            })}
          >
            Unirse
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO SECTION (El Gancho) - Tema Oscuro, Layout Editorial */}
        <section className="relative px-6 py-12 md:py-20 bg-foreground text-background border-b-4 border-background flex justify-center overflow-hidden">
          {/* Sello / Firma */}
          <div className="absolute top-6 left-6 font-mono text-xs font-bold tracking-widest uppercase text-background/50">
            SN4 // 2026
          </div>
          
          <div className="w-full max-w-[85rem] grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center z-10 pt-12">
            
            {/* Columna Izquierda: Información enriquecida y CTA */}
            <div className="flex flex-col gap-6 order-2 lg:order-1">
              <div className="space-y-6">
                {/* TITULAR DEL HERO - Aquí usamos font-exotic (Syne) */}
                <h1 className="font-[family-name:var(--font-exotic)] font-extrabold text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter leading-[0.85] text-background">
                  Tu negocio <br/>
                  <span className="text-primary">en piloto automático</span>
                </h1>
                
                {/* TEXTO DEL HERO - Tipografía de Acento (Space Grotesk) para que rompa lo plano */}
                <p className="font-[family-name:var(--font-accent)] font-medium text-lg md:text-xl text-balance text-background/90 leading-relaxed max-w-lg mt-4">
                  Deja de perder tiempo saltando entre <span className="text-background font-bold bg-foreground decoration-primary decoration-2 underline underline-offset-4">WhatsApp y libretas</span>. WebLine es la infraestructura digital invisible que centraliza tus reservas, clientes y operación en un solo lugar.
                </p>
                
                <div className="pt-4">
                  <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] text-primary font-bold border-l-2 border-primary pl-4 py-1">
                    El software se adapta a ti, no tú al software.
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <a 
                  href="#pricing" 
                  className={buttonVariants({ 
                    size: "lg", 
                    className: "w-full md:w-auto rounded-none border-2 border-background shadow-[6px_6px_0px_0px_#f4f4f0] hover:translate-y-[3px] hover:translate-x-[3px] hover:shadow-[3px_3px_0px_0px_#f4f4f0] transition-all bg-primary text-primary-foreground uppercase font-heading text-2xl px-10 py-8 tracking-widest" 
                  })}
                >
                  Digitaliza tu negocio
                </a>
              </div>
            </div>

            {/* Columna Derecha: El arte tipográfico (wb4) */}
            <div className="relative w-full aspect-square flex items-center justify-end order-1 lg:order-2 ml-auto lg:-mr-12">
              <div className="relative w-full max-w-[650px] aspect-[4/5] lg:aspect-[3/4]">
                <Image 
                  src="/images/wb4.png" 
                  alt="Atiende a tus clientes, no a la agenda. Est. 2026."
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.05)] origin-center"
                  priority
                  unoptimized // Desactiva caché en dev para que veas tus cambios al instante
                />
              </div>
            </div>
            
          </div>
        </section>

        {/* EL MANIFIESTO (El Problema) - Fondo wb5.jpg con Glassmorphism */}
        <section id="manifiesto" className="relative px-6 py-24 md:py-40 flex justify-center border-b-4 border-foreground scroll-m-20 overflow-hidden">
          {/* Fondo de imagen a todo color (wb5.jpg) */}
          <div className="absolute inset-0 z-0">
            <Image 
              src="/images/wb5.jpg" 
              alt="Fondo Manifiesto"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Contenedor Liquid Glass */}
          <div className="relative z-10 max-w-4xl w-full backdrop-blur-2xl bg-background/70 border border-background/50 shadow-2xl p-10 md:p-16 flex flex-col items-start rounded-sm">
            
            {/* Sello wb6 en la esquina superior derecha */}
            <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 w-32 h-32 md:w-56 md:h-56 opacity-90 mix-blend-multiply z-20 pointer-events-none">
              <Image 
                src="/images/wb6.png" 
                alt="Sello WebLine"
                fill
                sizes="(max-width: 768px) 128px, 224px"
                className="object-contain"
                unoptimized
              />
            </div>

            <h2 className="font-[family-name:var(--font-exotic)] text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter mb-10 text-foreground">
              El <span className="text-primary">Manifiesto</span>
            </h2>
            <div className="flex flex-col gap-10 font-bold text-2xl md:text-3xl lg:text-4xl leading-tight font-sans text-balance text-foreground relative z-10">
              <p className="border-l-8 border-primary pl-6">
                RESPONDER POR WHATSAPP, INSTAGRAM, LLAMADAS Y REVISAR LA LIBRETA FÍSICA AL MISMO TIEMPO NO ES GESTIÓN. ES CAOS.
              </p>
              <p className="text-foreground/70 pl-6">
                LOS NEGOCIOS LOCALES ESTÁN FRAGMENTADOS POR CULPA DE HERRAMIENTAS QUE NO SE HABLAN ENTRE SÍ.
              </p>
              <p className="pl-6">
                WEBLINE CENTRALIZA LA OPERACIÓN. TÚ SOLO ENFÓCATE EN TU ARTE.
              </p>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA (El Flujo sin fricción) */}
        <section id="como-funciona" className="px-6 py-24 md:py-32 bg-foreground text-background flex justify-center border-b-4 border-background scroll-m-20">
           <div className="max-w-6xl w-full flex flex-col items-center">
              <div className="text-center mb-20 space-y-4">
                <h2 className="font-heading text-5xl md:text-7xl uppercase tracking-tighter text-background">
                  Cero <span className="text-primary">Fricción</span>
                </h2>
                <p className="font-mono text-sm uppercase tracking-widest text-background/60">
                  3 pasos para recuperar tu tiempo
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
                {/* Paso 1 */}
                <div className="flex flex-col gap-6 relative">
                  <span className="font-heading text-8xl text-primary/20 absolute -top-12 -left-4 select-none">01</span>
                  <div className="relative z-10 space-y-4">
                    <h3 className="font-[family-name:var(--font-accent)] text-2xl font-bold uppercase tracking-wide">Configuras</h3>
                    <p className="font-sans text-lg text-background/80">
                      Define tus servicios, horarios, profesionales y políticas en cuestión de minutos desde tu celular o PC.
                    </p>
                  </div>
                </div>

                {/* Paso 2 */}
                <div className="flex flex-col gap-6 relative">
                  <span className="font-heading text-8xl text-primary/20 absolute -top-12 -left-4 select-none">02</span>
                  <div className="relative z-10 space-y-4">
                    <h3 className="font-[family-name:var(--font-accent)] text-2xl font-bold uppercase tracking-wide">Publicas</h3>
                    <p className="font-sans text-lg text-background/80">
                      Obtienes tu enlace único y código QR. Pégalo en tu Instagram, envíalo por WhatsApp o imprímelo en tu local.
                    </p>
                  </div>
                </div>

                {/* Paso 3 */}
                <div className="flex flex-col gap-6 relative">
                  <span className="font-heading text-8xl text-primary/20 absolute -top-12 -left-4 select-none">03</span>
                  <div className="relative z-10 space-y-4">
                    <h3 className="font-[family-name:var(--font-accent)] text-2xl font-bold uppercase tracking-wide">Reservan</h3>
                    <p className="font-sans text-lg text-background/80">
                      Tus clientes eligen y confirman al instante sin descargar apps ni crear contraseñas. Tú solo recibes la notificación.
                    </p>
                  </div>
                </div>
              </div>
           </div>
        </section>
        
        {/* PRICING (Planes sin sorpresas) */}
        <section id="pricing" className="relative px-6 py-24 md:py-32 bg-background flex justify-center scroll-m-20 border-b-4 border-foreground overflow-hidden">
           <div className="max-w-6xl w-full flex flex-col items-center relative z-10">
              <div className="text-center mb-20 space-y-4">
                <h2 className="font-heading text-5xl md:text-7xl uppercase tracking-tighter text-foreground">
                  Cero <span className="text-primary">Letra Chica</span>
                </h2>
                <p className="font-mono text-sm uppercase tracking-widest text-foreground/60">
                  Infraestructura accesible para tu negocio
                </p>
              </div>

              {/* Contenedor relativo para poder anclar a la mascota afuera sin dañar el centrado */}
              <div className="relative w-full max-w-5xl">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 w-full">
                
                {/* PLAN STARTER */}
                <div className="flex flex-col border-4 border-foreground bg-background shadow-[12px_12px_0px_0px_#0033cc] hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_#0033cc] transition-all p-8 md:p-10 relative overflow-hidden">
                  
                  {/* Mascota Starter (wb7) - Adentro, llenando el vacío derecho */}
                  <div className="absolute right-[-20%] md:right-[-10%] top-1/3 w-64 h-64 md:w-80 md:h-80 z-0 pointer-events-none opacity-30 md:opacity-100">
                    <Image 
                      src="/images/wb7.png" 
                      alt="Mascota Starter"
                      fill
                      sizes="(max-width: 768px) 256px, 320px"
                      className="object-contain object-right"
                      unoptimized
                    />
                  </div>

                  <div className="space-y-2 mb-8 relative z-10">
                    <h3 className="font-[family-name:var(--font-accent)] text-3xl font-bold uppercase tracking-widest text-foreground">
                      Starter
                    </h3>
                    <p className="font-[family-name:var(--font-exotic)] text-4xl md:text-5xl font-black tracking-tighter text-foreground">
                      $65.000 <span className="text-xl tracking-wide font-sans text-foreground/60 font-medium">COP / mes</span>
                    </p>
                  </div>

                  <div className="flex-1 space-y-6 font-sans font-bold text-foreground/80 text-lg relative z-10 max-w-[70%]">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary"></div>
                      <span>Hasta <strong className="text-foreground">3 empleados</strong></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary"></div>
                      <span><strong className="text-foreground">1 sucursal</strong></span>
                    </div>
                    <hr className="border-t-2 border-foreground/10" />
                    <ul className="space-y-3 text-base font-medium">
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">+</span> Gestión de servicios</li>
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">+</span> Agenda</li>
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">+</span> Clientes</li>
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">+</span> Reservas online</li>
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">+</span> Pública de reservas</li>
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">+</span> QR / link de reservas</li>
                    </ul>
                  </div>

                  <div className="pt-10 mt-auto relative z-10">
                    <Link 
                      href={`${routes.activate}?plan=starter`} 
                      className={buttonVariants({ 
                        className: "w-full rounded-none border-2 border-foreground bg-background text-foreground hover:bg-foreground hover:text-background uppercase font-heading text-xl py-6 tracking-widest transition-colors" 
                      })}
                    >
                      Solicitar Starter
                    </Link>
                  </div>
                </div>

                {/* PLAN PRO */}
                <div className="flex flex-col border-4 border-foreground bg-foreground shadow-[12px_12px_0px_0px_#0033cc] hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_#0033cc] transition-all p-8 md:p-10 relative overflow-hidden">
                  
                  {/* Mascota Pro (wb8) - Adentro, llenando el vacío derecho */}
                  <div className="absolute right-[-20%] md:right-[-10%] top-1/3 w-64 h-64 md:w-80 md:h-80 z-0 pointer-events-none opacity-30 md:opacity-100">
                    <Image 
                      src="/images/wb8.png" 
                      alt="Mascota Pro"
                      fill
                      sizes="(max-width: 768px) 256px, 320px"
                      className="object-contain object-right"
                      unoptimized
                    />
                  </div>

                  <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground font-mono text-xs font-bold px-4 py-2 uppercase tracking-widest border-2 border-foreground shadow-[4px_4px_0px_0px_#000] z-30">
                    Más Elegido
                  </div>
                  <div className="space-y-2 mb-8 mt-4 relative z-10">
                    <h3 className="font-[family-name:var(--font-accent)] text-3xl font-bold uppercase tracking-widest text-background">
                      Pro
                    </h3>
                    <p className="font-[family-name:var(--font-exotic)] text-4xl md:text-5xl font-black tracking-tighter text-primary">
                      $100.000 <span className="text-xl tracking-wide font-sans text-background/60 font-medium">COP / mes</span>
                    </p>
                  </div>

                  <div className="flex-1 space-y-6 font-sans font-bold text-background/90 text-lg relative z-10 max-w-[70%]">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary"></div>
                      <span>Hasta <strong className="text-background">15 empleados</strong></span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary"></div>
                      <span>Hasta <strong className="text-background">3 sucursales</strong></span>
                    </div>
                    <hr className="border-t-2 border-background/20" />
                    <ul className="space-y-3 text-base font-medium text-background/80">
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">✦</span> <strong className="text-background font-bold">Todo lo de Starter</strong></li>
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">+</span> Cancelaciones</li>
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">+</span> Reprogramaciones</li>
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">+</span> Clientes recurrentes</li>
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">+</span> Historial</li>
                      <li className="flex items-start gap-2"><span className="text-primary font-bold">+</span> Recordatorios</li>
                    </ul>
                  </div>

                  <div className="pt-10 mt-auto relative z-10">
                    <div className="text-center mb-3">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-primary font-bold">15 días de prueba gratis</span>
                    </div>
                    <Link 
                      href={`${routes.activate}?plan=pro`} 
                      className={buttonVariants({ 
                        className: "w-full rounded-none border-2 border-primary bg-primary text-primary-foreground hover:bg-background hover:text-foreground hover:border-background uppercase font-heading text-xl py-6 tracking-widest transition-colors" 
                      })}
                    >
                      Probar Pro Gratis
                    </Link>
                  </div>
                </div>

                </div>

              </div>
           </div>
        </section>
        
        {/* SECTORES (Marquesina) */}
        <section className="py-3 bg-primary text-primary-foreground overflow-hidden border-b-4 border-background flex">
          <div className="font-heading text-xl md:text-3xl uppercase tracking-widest whitespace-nowrap flex animate-marquee w-max">
             <div className="flex items-center gap-4 px-4">
               <span>BARBERÍAS</span> <span className="text-background">✦</span> 
               <span>TATUADORES</span> <span className="text-background">✦</span> 
               <span>ESTUDIOS CREATIVOS</span> <span className="text-background">✦</span> 
               <span>CONSULTORIOS</span> <span className="text-background">✦</span> 
               <span>SALONES DE BELLEZA</span> <span className="text-background">✦</span> 
               <span>CLÍNICAS</span> <span className="text-background">✦</span>
               <span>Y MUCHOS MÁS...</span>
             </div>
             {/* Duplicado exacto para el efecto infinito continuo */}
             <div className="flex items-center gap-4 px-4">
               <span className="text-background">✦</span> 
               <span>BARBERÍAS</span> <span className="text-background">✦</span> 
               <span>TATUADORES</span> <span className="text-background">✦</span> 
               <span>ESTUDIOS CREATIVOS</span> <span className="text-background">✦</span> 
               <span>CONSULTORIOS</span> <span className="text-background">✦</span> 
               <span>SALONES DE BELLEZA</span> <span className="text-background">✦</span> 
               <span>CLÍNICAS</span> <span className="text-background">✦</span>
               <span>Y MUCHOS MÁS...</span>
             </div>
             <div className="flex items-center gap-4 px-4">
               <span className="text-background">✦</span> 
               <span>BARBERÍAS</span> <span className="text-background">✦</span> 
               <span>TATUADORES</span> <span className="text-background">✦</span> 
               <span>ESTUDIOS CREATIVOS</span> <span className="text-background">✦</span> 
               <span>CONSULTORIOS</span> <span className="text-background">✦</span> 
               <span>SALONES DE BELLEZA</span> <span className="text-background">✦</span> 
               <span>CLÍNICAS</span> <span className="text-background">✦</span>
               <span>Y MUCHOS MÁS...</span>
             </div>
          </div>
        </section>

      </main>

      {/* FOOTER (Cierre Brutalista) */}
      <footer className="w-full border-t-4 border-foreground bg-background px-6 py-10 flex flex-col items-center">
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-2">
            <span className="font-heading text-4xl uppercase tracking-tighter text-foreground leading-none">
              Web<span className="text-primary">Line</span>
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 font-mono text-xs uppercase tracking-widest text-foreground/80 font-bold">
            <a 
              href="https://wa.me/573205382409" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-primary transition-colors hover:-translate-y-1 inline-block"
            >
              WA: +57 320 538 2409
            </a>
            
            <span className="hidden md:inline text-foreground/30">|</span>
            
            <span>© 2026 WEBLINE APP</span>
            
            <span className="hidden md:inline text-foreground/30">|</span>

            <span className="text-foreground">
              DESARROLLADO BY <span className="text-primary">SN4</span>
            </span>
          </div>
          
        </div>
      </footer>

    </div>
  );
}
