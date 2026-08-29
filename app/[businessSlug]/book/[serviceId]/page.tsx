/**
 * Página de reserva de un servicio específico.
 */

interface BookServicePageProps {
  params: Promise<{ businessSlug: string; serviceId: string }>;
}

export async function generateMetadata({ params }: BookServicePageProps) {
  const { businessSlug } = await params;
  return {
    title: `Reservar — ${businessSlug}`,
  };
}

export default async function BookServicePage({ params }: BookServicePageProps) {
  const { businessSlug, serviceId } = await params;

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Reservar servicio</h1>
      <p className="text-muted-foreground mt-1">
        Negocio: {businessSlug} — Servicio: {serviceId}
      </p>
      {/* TODO: <BookingForm /> de features/booking */}
    </div>
  );
}
