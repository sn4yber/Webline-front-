/**
 * Página principal del portal de un negocio.
 * Muestra perfil del negocio + lista de servicios.
 */

interface BusinessPageProps {
  params: Promise<{ businessSlug: string }>;
}

export async function generateMetadata({ params }: BusinessPageProps) {
  const { businessSlug } = await params;
  // TODO: Fetch business name del API para metadata dinámica
  return {
    title: `Reservas — ${businessSlug}`,
    description: `Reserva online con ${businessSlug}`,
  };
}

export default async function BusinessBookingPage({ params }: BusinessPageProps) {
  const { businessSlug } = await params;

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">{businessSlug}</h1>
      <p className="text-muted-foreground mt-2">
        Selecciona un servicio para reservar.
      </p>
      {/* TODO: <BusinessProfile /> + <ServiceList /> de features/booking */}
    </div>
  );
}
