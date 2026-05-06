import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Plane, Hotel, Car, Compass, Check, MessageCircle } from "lucide-react";
import { destinations, getDestination, WHATSAPP_URL } from "@/data/destinations";

export const Route = createFileRoute("/destinos/$slug")({
  loader: ({ params }) => {
    const dest = getDestination(params.slug);
    if (!dest) throw notFound();
    return { dest };
  },
  head: ({ loaderData }) => {
    const d = loaderData?.dest;
    if (!d) return { meta: [{ title: "Destino no encontrado" }] };
    return {
      meta: [
        { title: `${d.seoTitle} | Wanderlux` },
        { name: "description", content: `${d.seoTitle}. ${d.description}` },
        { property: "og:title", content: d.seoTitle },
        { property: "og:description", content: d.description },
        { property: "og:image", content: d.image },
      ],
    };
  },
  component: DestinoDetalle,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold text-primary">Destino no encontrado</h1>
      <Link to="/destinos" className="mt-4 inline-block text-emerald">Ver todos los destinos →</Link>
    </div>
  ),
});

function DestinoDetalle() {
  const { dest } = Route.useLoaderData();

  const includes = [
    { Icon: Plane, title: "Vuelos", desc: "Boletos aéreos ida y vuelta" },
    { Icon: Hotel, title: "Hotel Resort", desc: "Categorías 4★ y 5★ todo incluido" },
    { Icon: Car, title: "Traslados", desc: "Aeropuerto - hotel - aeropuerto" },
    { Icon: Compass, title: "Tours", desc: "Las mejores excursiones locales" },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={dest.image} alt={dest.name} width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-32">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald">Destino</p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold text-primary-foreground md:text-6xl">
            Paquetes a {dest.name} Todo Incluido.
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/85">{dest.description}</p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-emerald px-6 py-3 text-sm font-semibold text-emerald-foreground shadow-luxe hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> Cotiza por WhatsApp
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">¿Qué incluyen nuestros planes?</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {includes.map(({ Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald/15 text-emerald">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-primary">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">Ofertas de Viaje desde Guatemala.</h2>
            <p className="mt-3 text-muted-foreground">
              Salidas semanales desde Ciudad de Guatemala. Descuentos especiales en grupo y promociones de temporada.
            </p>
            <ul className="mt-6 space-y-3">
              {dest.highlights.map((h) => (
                <li key={h} className="flex items-center gap-3 text-sm">
                  <Check className="h-4 w-4 text-emerald" /> {h}
                </li>
              ))}
            </ul>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Solicitar cotización
            </a>
          </div>
          <div className="rounded-2xl border border-border bg-secondary/40 p-8">
            <h3 className="font-display text-2xl font-bold text-primary">Otros destinos</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {destinations.filter((d) => d.slug !== dest.slug).slice(0, 4).map((d) => (
                <Link key={d.slug} to="/destinos/$slug" params={{ slug: d.slug }} className="group overflow-hidden rounded-lg border border-border bg-card">
                  <img src={d.image} alt={d.name} loading="lazy" width={512} height={384} className="aspect-video w-full object-cover transition-transform group-hover:scale-105" />
                  <div className="px-3 py-2 text-sm font-semibold text-primary">{d.name}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
