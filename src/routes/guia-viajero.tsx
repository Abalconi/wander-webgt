import { createFileRoute } from "@tanstack/react-router";
import { Calendar, FileCheck, Luggage, Sun, Globe, Plane } from "lucide-react";
import { useLang } from "@/lib/lang";

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

export function Guia() {
  const { t } = useLang();

  const articles = [
    { 
      Icon: Calendar, 
      title: t("Mejor época para viajar a Río", "Best time to travel to Rio"), 
      excerpt: t("Descubre los meses ideales para visitar Río de Janeiro y disfrutar al máximo de sus playas, carnaval y clima.", "Discover the ideal months to visit Rio de Janeiro and fully enjoy its beaches, carnival and climate.") 
    },
    { 
      Icon: FileCheck, 
      title: t("Requisitos para el Caribe", "Requirements for the Caribbean"), 
      excerpt: t("Pasaporte, visas, tarjetas de turismo y todo lo que necesitas para entrar a Punta Cana, Cancún, Aruba y Curazao.", "Passport, visas, tourist cards and everything you need to enter Punta Cana, Cancun, Aruba and Curacao.") 
    },
    { 
      Icon: Luggage, 
      title: t("¿Qué empacar para un Todo Incluido?", "What to pack for an All-Inclusive?"), 
      excerpt: t("Lista esencial para que aproveches al máximo tu estadía en un resort caribeño.", "Essential list for you to make the most of your stay at a Caribbean resort.") 
    },
    { 
      Icon: Sun, 
      title: t("Cancún vs Punta Cana: ¿cuál elegir?", "Cancun vs Punta Cana: which to choose?"), 
      excerpt: t("Comparamos clima, playas, gastronomía y experiencias para que decidas tu próximo destino.", "We compare climate, beaches, gastronomy and experiences for you to decide your next destination.") 
    },
    { 
      Icon: Globe, 
      title: t("Consejos para viajar a Cartagena", "Tips for traveling to Cartagena"), 
      excerpt: t("Zonas seguras, mejores restaurantes y tours imperdibles en la ciudad amurallada.", "Safe areas, best restaurants and must-see tours in the walled city.") 
    },
    { 
      Icon: Plane, 
      title: t("Cómo conseguir vuelos baratos", "How to get cheap flights"), 
      excerpt: t("Trucos profesionales para encontrar las mejores tarifas aéreas durante todo el año.", "Professional tricks to find the best airfares throughout the year.") 
    },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <p className="text-sm font-semibold uppercase tracking-widest text-emerald">{t("Blog", "Blog")}</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-primary md:text-5xl">
        {t("Guía del Viajero: Consejos y Requisitos.", "Travel Guide: Tips and Requirements.")}
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        {t("Información práctica para que tu próximo viaje sea perfecto desde el primer momento.", "Practical information so that your next trip is perfect from the very first moment.")}
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map(({ Icon, title, excerpt }) => (
          <article key={title} className="rounded-xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-luxe">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald/15 text-emerald">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-display text-xl font-semibold text-primary">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{excerpt}</p>
            <h3 className="mt-4 text-xs font-semibold uppercase tracking-widest text-emerald">{t("Leer artículo →", "Read article →")}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
