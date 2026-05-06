import { createFileRoute, Link } from "@tanstack/react-router";
import { Tag, ArrowRight, Flame } from "lucide-react";
import { destinations, WHATSAPP_URL } from "@/data/destinations";

export const Route = createFileRoute("/ofertas")({
  head: () => ({
    meta: [
      { title: "Ofertas de Viajes y Paquetes en Promoción | Wanderlux" },
      { name: "description", content: "Aprovecha nuestras ofertas de viajes. Mayo es el mes más barato del año para viajar. Paquetes económicos a Cancún, Punta Cana y más." },
      { property: "og:title", content: "Ofertas de Viajes y Paquetes en Promoción" },
      { property: "og:description", content: "Mayo: el mes más barato para viajar. ¡Aprovecha las mejores promociones!" },
    ],
  }),
  component: Ofertas,
});

function Ofertas() {
  const ofertas = [
    { d: destinations[1], price: 1099, nights: 5, label: "Paquetes económicos a Cancún" },
    { d: destinations[0], price: 1299, nights: 6, label: "Punta Cana en oferta" },
    { d: destinations[3], price: 1399, nights: 5, label: "Aruba con descuento" },
    { d: destinations[5], price: 899, nights: 4, label: "Cartagena fin de semana largo" },
    { d: destinations[2], price: 1499, nights: 6, label: "Curazao tarifa especial" },
    { d: destinations[4], price: 1599, nights: 7, label: "Río de Janeiro promo" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <div className="overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground shadow-luxe md:p-12">
        <div className="flex items-center gap-2 text-emerald">
          <Flame className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-widest">Promoción del mes</span>
        </div>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          Ofertas de Viajes y Paquetes en Promoción.
        </h1>
        <p className="mt-4 max-w-2xl font-display text-2xl text-primary-foreground/90 md:text-3xl">
          MAYO: El mes más barato para viajar en todo el año. <span className="text-emerald">¡Aprovecha ahora!</span>
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-emerald px-6 py-3 text-sm font-semibold text-emerald-foreground hover:opacity-90"
        >
          Reservar ahora <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <h2 className="mt-16 font-display text-3xl font-bold text-primary md:text-4xl">Paquetes en oferta</h2>
      <p className="mt-2 text-muted-foreground">Selección curada de nuestras mejores tarifas del momento.</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ofertas.map(({ d, price, nights, label }) => (
          <article key={d.slug} className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-luxe">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={d.image} alt={label} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald px-3 py-1 text-xs font-bold text-emerald-foreground">
                <Tag className="h-3 w-3" /> Oferta
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-xl font-bold text-primary">{label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{nights} noches · Todo Incluido</p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <span className="text-xs text-muted-foreground">Desde</span>
                  <div className="font-display text-2xl font-bold text-primary">${price}</div>
                </div>
                <Link to="/destinos/$slug" params={{ slug: d.slug }} className="inline-flex items-center gap-1 text-sm font-semibold text-emerald hover:underline">
                  Ver detalles <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
