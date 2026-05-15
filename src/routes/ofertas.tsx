import { createFileRoute, Link } from "@tanstack/react-router";
import { Tag, ArrowRight, Flame } from "lucide-react";
import { destinations, getWhatsAppUrl } from "@/data/destinations";
import { useLang } from "@/lib/lang";
import { formatPrice } from "@/lib/utils";

export const Route = createFileRoute("/ofertas")({
  head: () => ({
    meta: [
      { title: "Ofertas de Viajes para Vacaciones de Junio | Wanderlux" },
      { name: "description", content: "Aprovecha nuestras ofertas de viajes para las vacaciones de junio. ¡Aruba con un 50% de descuento y más promociones increíbles!" },
      { property: "og:title", content: "Ofertas de Viajes para Vacaciones de Junio" },
      { property: "og:description", content: "Junio: las mejores ofertas para tus vacaciones de medio año. ¡Aprovecha ahora!" },
    ],
    links: [
      { rel: "canonical", href: "https://wandergt.com/ofertas" },
      { rel: "alternate", hreflang: "es", href: "https://wandergt.com/ofertas" },
      { rel: "alternate", hreflang: "en", href: "https://wandergt.com/en/ofertas" },
      { rel: "alternate", hreflang: "x-default", href: "https://wandergt.com/ofertas" },
    ],
  }),
  component: Ofertas,
});

export function Ofertas() {
  const { t, lang } = useLang();
  const ofertas = [
    { 
      d: destinations[3], 
      price: 9299, 
      nights: 4, 
      label: t("Aruba: ¡50% de Descuento!", "Aruba: 50% Off!"),
      badge: t("50% DESC", "50% OFF")
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
      <div className="overflow-hidden rounded-2xl bg-primary p-8 text-primary-foreground shadow-luxe md:p-12">
        <div className="flex items-center gap-2 text-emerald">
          <Flame className="h-5 w-5" />
          <span className="text-xs font-semibold uppercase tracking-widest">{t("Promoción del mes", "Promotion of the month")}</span>
        </div>
        <h1 className="mt-3 font-display text-4xl font-bold md:text-5xl">
          {t("Ofertas para las Vacaciones de Junio.", "June Vacation Travel Deals.")}
        </h1>
        <p className="mt-4 max-w-2xl font-display text-2xl text-primary-foreground/90 md:text-3xl">
          {t("JUNIO: Las mejores ofertas para tus vacaciones de medio año.", "JUNE: The best deals for your mid-year vacations.")} <span className="text-emerald">{t("¡Aprovecha ahora!", "Take advantage now!")}</span>
        </p>
        <a
          href={getWhatsAppUrl(
            t(
              "Hola, quiero más info sobre los paquetes en la página de ofertas",
              "Hello, I want more info about the packages on the deals page"
            )
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-emerald px-6 py-3 text-sm font-semibold text-emerald-foreground hover:opacity-90"
        >
          {t("Reservar ahora", "Book now")} <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <h2 className="mt-16 font-display text-3xl font-bold text-primary md:text-4xl">{t("Paquetes en oferta", "Packages on sale")}</h2>
      <p className="mt-2 text-muted-foreground">{t("Selección curada de nuestras mejores tarifas del momento.", "Curated selection of our best current rates.")}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ofertas.map(({ d, price, nights, label, badge }) => (
          <article key={d.slug} className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-luxe">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img src={d.image} alt={label} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald px-3 py-1 text-xs font-bold text-emerald-foreground">
                <Tag className="h-3 w-3" /> {badge || t("Oferta", "Offer")}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-xl font-bold text-primary">{label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {nights} {t("noches", "nights")} · {d.boarding === "all-inclusive" ? t("Todo Incluido", "All Inclusive") : t("Solo desayunos", "Breakfast only")}
              </p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <span className="text-xs text-muted-foreground">{t("Desde", "From")}</span>
                  <div className="font-display text-2xl font-bold text-primary">{formatPrice(price, lang)}</div>
                </div>
                <Link to="/destinos/$slug" params={{ slug: d.slug }} className="inline-flex items-center gap-1 text-sm font-semibold text-emerald hover:underline">
                  {t("Ver detalles", "View details")} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
