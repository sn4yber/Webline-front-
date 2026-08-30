"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, FormEvent, Suspense } from "react";
import { buttonVariants } from "@/components/ui/button";
import { apiClient } from "@/api/client";
import { endpoints } from "@/api/endpoints";
import type { Plan } from "@/types/admin.types";

function ActivateForm() {
  const searchParams = useSearchParams();
  const selectedPlanCode = searchParams.get("plan")?.toUpperCase() || "STARTER";
  const [planes, setPlanes] = useState<Plan[]>([]);
  
  useEffect(() => {
    apiClient.get<Plan[]>(endpoints.publico.planes)
      .then(setPlanes)
      .catch(console.error);
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    negocio: "",
    propietario: "",
    email: "",
    telefono: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    const [nombrePropietario, ...apellidos] = formData.propietario.trim().split(/\s+/);
    const payload = {
      emailPropietario: formData.email,
      nombrePropietario,
      apellidoPropietario: apellidos.join(" ") || "No especificado",
      telefonoPropietario: formData.telefono,
      nombreNegocio: formData.negocio,
      tipoNegocio: "OTRO",
      planId: planes.find(p => p.codigo === selectedPlanCode)?.id || null,
      notasSolicitante: null,
    };
    try {
      await apiClient.post(endpoints.publico.solicitudesActivacion, payload);
      setIsSuccess(true);
    } catch (err: unknown) {
      const msg = (err && typeof err === "object" && "detail" in err)
        ? (err as { detail: string }).detail
        : (err && typeof err === "object" && "message" in err)
          ? (err as { message: string }).message
          : "Error desconocido al enviar la solicitud.";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── PANTALLA DE ÉXITO ──────────────────────────────────
  if (isSuccess) {
    return (
      <div className="relative min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 overflow-hidden">
        
        {/* Fondo con imagen wb9 */}
        <div className="absolute inset-0 z-0 bg-foreground">
          <Image 
            src="/images/wb9.jpg" 
            alt="Background Activación" 
            fill 
            sizes="100vw"
            className="object-cover object-center" 
            unoptimized
            priority
          />
        </div>

        <div className="w-full max-w-2xl relative z-10">
          <div className="border-4 border-foreground bg-background/80 backdrop-blur-xl shadow-[16px_16px_0px_0px_#0033cc] p-10 md:p-16 text-center">
            
            {/* Checkmark Brutalista */}
            <div className="w-28 h-28 mx-auto mb-8 border-4 border-primary bg-primary text-primary-foreground flex items-center justify-center shadow-[8px_8px_0px_0px_#000]">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="square" strokeLinejoin="miter" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="font-heading text-5xl md:text-6xl uppercase tracking-tighter mb-4">
              Solicitud <span className="text-primary">Enviada</span>
            </h1>

            <div className="border-t-4 border-b-4 border-foreground py-6 my-8">
              <p className="font-sans text-lg md:text-xl font-bold text-foreground/80 leading-relaxed">
                Gracias <strong className="text-foreground">{formData.propietario}</strong>, recibimos tu solicitud 
                para activar <strong className="text-foreground">{formData.negocio}</strong> con 
                el plan <strong className="text-primary">{selectedPlanCode}</strong>.
              </p>
            </div>

            <p className="font-mono text-sm uppercase tracking-widest text-foreground/60 font-bold mb-2">
              Nos pondremos en contacto contigo en menos de 24h
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-foreground/40 font-bold mb-10">
              Revisaremos tu solicitud y te enviaremos la invitación a <strong className="text-foreground/60">{formData.email}</strong>
            </p>

            <Link 
              href="/" 
              className={buttonVariants({ 
                size: "lg", 
                className: "w-full rounded-none border-2 border-foreground shadow-[6px_6px_0px_0px_#000] hover:translate-y-[3px] hover:translate-x-[3px] hover:shadow-[3px_3px_0px_0px_#000] transition-all bg-foreground text-background uppercase font-heading text-xl py-8 tracking-widest" 
              })}
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── FORMULARIO ─────────────────────────────────────────
  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 border-b-4 border-foreground overflow-hidden">
      
      {/* Fondo con imagen wb9 */}
      <div className="absolute inset-0 z-0 bg-foreground">
        <Image 
          src="/images/wb9.jpg" 
          alt="Background Activación" 
          fill 
          sizes="100vw"
          className="object-cover object-center" 
          unoptimized
          priority
        />
      </div>

      <div className="w-full max-w-3xl relative z-10">
        {/* Decoración Brutalista */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary/40 blur-2xl rounded-full z-0 pointer-events-none"></div>

        {/* Header simple para regresar */}
        <div className="mb-12 relative z-10 flex justify-between items-center">
          <Link 
            href="/" 
            className="font-mono text-sm uppercase font-bold hover:text-primary transition-colors flex items-center gap-2 bg-background/90 px-4 py-2 border-2 border-foreground backdrop-blur-md"
          >
            <span className="text-xl leading-none">&larr;</span> Volver al inicio
          </Link>
          <div className="font-heading text-2xl uppercase tracking-tighter bg-background/90 px-4 py-2 border-2 border-foreground backdrop-blur-md">
            Web<span className="text-primary">Line</span>
          </div>
        </div>

        {/* Tarjeta del Formulario (Liquid Glass brutalista) */}
        <div className="border-4 border-foreground bg-background/80 backdrop-blur-xl shadow-[16px_16px_0px_0px_#0033cc] p-8 md:p-12 relative z-10">
          
          <div className="mb-10 border-b-4 border-foreground pb-6">
            <h1 className="font-heading text-5xl md:text-6xl uppercase tracking-tighter mb-2">
              Solicitud de <br/><span className="text-primary">Activación</span>
            </h1>
            <p className="font-mono text-sm uppercase tracking-widest text-foreground/70 font-bold">
              Estás a un paso de digitalizar tu infraestructura.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase tracking-widest font-bold block">
                Plan Seleccionado
              </label>
              <div className="border-2 border-foreground bg-secondary/30 p-4 font-heading text-3xl uppercase tracking-widest text-primary flex justify-between items-center">
                {selectedPlanCode}
                <span className="font-sans text-sm font-bold text-foreground/50 tracking-normal">
                  (Bloqueado)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="negocio" className="font-mono text-xs uppercase tracking-widest font-bold block">
                  Nombre del Negocio *
                </label>
                <input 
                  type="text" 
                  id="negocio"
                  name="negocio"
                  required
                  value={formData.negocio}
                  onChange={(e) => setFormData({ ...formData, negocio: e.target.value })}
                  className="w-full border-2 border-foreground bg-background p-4 font-sans text-lg outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-none"
                  placeholder="Ej. Barbería Central"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="propietario" className="font-mono text-xs uppercase tracking-widest font-bold block">
                  Nombre del Propietario *
                </label>
                <input 
                  type="text" 
                  id="propietario"
                  name="propietario"
                  required
                  value={formData.propietario}
                  onChange={(e) => setFormData({ ...formData, propietario: e.target.value })}
                  className="w-full border-2 border-foreground bg-background p-4 font-sans text-lg outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-none"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest font-bold block">
                  Correo Electrónico *
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border-2 border-foreground bg-background p-4 font-sans text-lg outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-none"
                  placeholder="hola@ejemplo.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="telefono" className="font-mono text-xs uppercase tracking-widest font-bold block">
                  Teléfono / WhatsApp *
                </label>
                <input 
                  type="tel" 
                  id="telefono"
                  name="telefono"
                  required
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="w-full border-2 border-foreground bg-background p-4 font-sans text-lg outline-none focus:ring-4 focus:ring-primary/20 transition-all rounded-none"
                  placeholder="+57 300 000 0000"
                />
              </div>
            </div>

            <div className="pt-6 border-t-4 border-foreground mt-10">
              {submitError && (
                <p className="border-2 border-red-600 bg-red-50 p-4 font-mono text-sm font-bold text-red-700 mb-6">
                  {submitError}
                </p>
              )}
              <button 
                type="submit"
                disabled={isSubmitting}
                className={buttonVariants({ 
                  size: "lg", 
                  className: `w-full rounded-none border-2 border-foreground shadow-[6px_6px_0px_0px_#000] hover:translate-y-[3px] hover:translate-x-[3px] hover:shadow-[3px_3px_0px_0px_#000] transition-all bg-primary text-primary-foreground uppercase font-heading text-2xl py-8 tracking-widest ${isSubmitting ? "opacity-70 pointer-events-none" : ""}` 
                })}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-4">
                    <span className="w-6 h-6 border-3 border-primary-foreground border-t-transparent rounded-full animate-spin"></span>
                    Enviando...
                  </span>
                ) : (
                  "Enviar Solicitud"
                )}
              </button>
              <p className="text-center font-mono text-[10px] uppercase tracking-widest text-foreground/50 font-bold mt-4">
                Nos pondremos en contacto contigo en menos de 24h.
              </p>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

// Wrapper con Suspense porque useSearchParams lo requiere en App Router
export default function ActivatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-foreground flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-background border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ActivateForm />
    </Suspense>
  );
}
