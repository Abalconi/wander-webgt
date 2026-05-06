import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { destinations } from "@/data/destinations";

export const Route = createFileRoute("/destinos/")({
  head: () => ({
    meta: [
      { title: "Paquetes Turísticos y Destinos Internacionales | Wanderlux" },
      { name: "description", content: "Explora todos nuestros paquetes turísticos a destinos internacionales: Punta Cana, Cancún, Curazao, Aruba, Río de Janeiro y Cartagena." },
      { property: "og:title", content: "Paquetes Turísticos y Destinos Internacionales" },
      { property: "og:description", content: "Paquetes todo incluido a los mejores destinos del Caribe y Latinoamérica." },
    ],
  }),
  component: Destinos,
});

function Destinos() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-emerald">Catálogo</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-primary md:text-5xl">
        Paquetes Turísticos y Destinos Internacionales.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Selecciona tu próximo destino soñado. Todos nuestros paquetes incluyen vuelos, hotel, traslados y tours.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((d) => (
          <article key={d.slug} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-luxe">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={d.image} alt={`Paquetes a ${d.name}`} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h2 className="font-display text-2xl font-bold text-primary">{d.name}</h2>
              <h3 className="mt-1 text-sm font-semibold text-emerald">{d.seoTitle}</h3>
              <p className="mt-3 flex-1 text-sm text-muted-foreground">{d.description}</p>
              <Link
                to="/destinos/$slug"
                params={{ slug: d.slug }}
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Ver Detalles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
