import { createFileRoute } from "@tanstack/react-router";
import { Calendar, FileCheck, Luggage, Sun, Globe, Plane } from "lucide-react";

export const Route = createFileRoute("/guia-viajero")({
  head: () => ({
    meta: [
      { title: "Guía del Viajero: Consejos y Requisitos | Wanderlux" },
      { name: "description", content: "Guía del viajero: consejos, requisitos de entrada, mejor época para viajar y todo lo que necesitas saber antes de tu próximo viaje." },
      { property: "og:title", content: "Guía del Viajero: Consejos y Requisitos" },
      { property: "og:description", content: "Todo lo que necesitas saber antes de tu próximo viaje." },
    ],
  }),
  component: Guia,
});

const articles = [
  { Icon: Calendar, title: "Mejor época para viajar a Río", excerpt: "Descubre los meses ideales para visitar Río de Janeiro y disfrutar al máximo de sus playas, carnaval y clima." },
  { Icon: FileCheck, title: "Requisitos para el Caribe", excerpt: "Pasaporte, visas, tarjetas de turismo y todo lo que necesitas para entrar a Punta Cana, Cancún, Aruba y Curazao." },
  { Icon: Luggage, title: "¿Qué empacar para un Todo Incluido?", excerpt: "Lista esencial para que aproveches al máximo tu estadía en un resort caribeño." },
  { Icon: Sun, title: "Cancún vs Punta Cana: ¿cuál elegir?", excerpt: "Comparamos clima, playas, gastronomía y experiencias para que decidas tu próximo destino." },
  { Icon: Globe, title: "Consejos para viajar a Cartagena", excerpt: "Zonas seguras, mejores restaurantes y tours imperdibles en la ciudad amurallada." },
  { Icon: Plane, title: "Cómo conseguir vuelos baratos", excerpt: "Trucos profesionales para encontrar las mejores tarifas aéreas durante todo el año." },
];

function Guia() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-emerald">Blog</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-primary md:text-5xl">
        Guía del Viajero: Consejos y Requisitos.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Información práctica para que tu próximo viaje sea perfecto desde el primer momento.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map(({ Icon, title, excerpt }) => (
          <article key={title} className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-luxe">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald/15 text-emerald">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-display text-xl font-semibold text-primary">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{excerpt}</p>
            <h3 className="mt-4 text-xs font-semibold uppercase tracking-widest text-emerald">Leer artículo →</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
