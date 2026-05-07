import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plane, Hotel, Car, Compass, Check, MessageCircle, Download, MapPin } from "lucide-react";
import { destinations, getDestination, WHATSAPP_URL, COMPANY_EMAIL } from "@/data/destinations";
import { ItineraryDialog } from "@/components/ItineraryDialog";
import { useLang } from "@/lib/lang";

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
      <Link to="/destinos" className="mt-4 inline-block text-gold">Ver todos los destinos →</Link>
    </div>
  ),
});

function DestinoDetalle() {
  const { dest } = Route.useLoaderData();
  const { t, lang } = useLang();
  const [openDialog, setOpenDialog] = useState(false);

  const includes = [
    { Icon: Plane, title: t("Vuelos", "Flights"), desc: t("Ida y vuelta desde Guatemala", "Round trip from Guatemala") },
    { Icon: Hotel, title: t("Hotel Resort", "Resort Hotel"), desc: t("Alojamiento todo incluido", "All-inclusive lodging") },
    { Icon: Car, title: t("Traslados", "Transfers"), desc: t("Aeropuerto-Hotel-Aeropuerto", "Airport-Hotel-Airport") },
    { Icon: Compass, title: "Tours", desc: t("Excursiones opcionales", "Optional excursions") },
  ];

  const description = lang === "en" ? dest.descriptionEn : dest.description;
  const seoTitle = lang === "en" ? dest.seoTitleEn : dest.seoTitle;
  const includesList = lang === "en" ? dest.includesEn : dest.includes;

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img src={dest.image} alt={dest.name} width={1920} height={1080} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <h1 className="max-w-3xl font-display text-4xl font-bold text-primary-foreground md:text-6xl">
            {seoTitle}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1 text-sm font-bold text-gold-foreground">
              {t("Desde", "From")} ${dest.fromPrice}
            </span>
            <span className="text-sm text-primary-foreground/85">
              {dest.nights} {t("noches", "nights")}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT — info */}
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-primary">
              {t("Sobre", "About")} {dest.name}
            </h2>
            <p className="mt-3 text-muted-foreground">{description}</p>

            <h2 className="mt-10 font-display text-2xl font-bold text-primary">
              {t("¿Qué incluyen nuestros planes?", "What's included in our plans?")}
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {includes.map(({ Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-card">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 font-display text-2xl font-bold text-primary">
              {t("Puntos de interés en", "Points of interest in")} {dest.name}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {dest.attractions.map((a) => (
                <span key={a} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-primary">
                  <MapPin className="h-3 w-3 text-gold" /> {a}
                </span>
              ))}
            </div>

            <h2 className="mt-10 font-display text-2xl font-bold text-primary">
              {t("Puntos destacados del paquete", "Package highlights")}
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {(lang === "en" ? dest.highlightsEn : dest.highlights).map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm text-foreground">
                  <span className="inline-block h-2 w-2 rounded-full bg-gold" /> {h}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 font-display text-2xl font-bold text-primary">
              {t("El paquete incluye", "The package includes")}
            </h2>
            <ul className="mt-4 space-y-2">
              {includesList.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-gold" /> {item}
                </li>
              ))}
            </ul>

            {/* Download itinerary CTA */}
            <div className="mt-10 rounded-2xl border-2 border-dashed border-gold/50 bg-gold/10 p-6 text-center">
              <h3 className="font-display text-xl font-bold text-primary">
                {t("¿Quieres todos los detalles?", "Want the full details?")}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {t(
                  "Descarga el itinerario completo en PDF con horarios, hoteles y precios.",
                  "Download the full itinerary in PDF with schedules, hotels and prices."
                )}
              </p>
              <button
                onClick={() => setOpenDialog(true)}
                className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                {t("Descargar itinerario completo", "Download full itinerary")}
              </button>
            </div>
          </div>

          {/* RIGHT — pricing card */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-luxe">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t("Precio desde", "Price from")}
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold text-primary">${dest.fromPrice}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t("por persona", "per person")} / {dest.nights} {t("noches", "nights")}
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-bold text-gold-foreground hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" /> {t("Cotiza por WhatsApp", "Quote on WhatsApp")}
              </a>
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                {t("Respuesta en menos de 5 horas en horario laboral.", "Response in less than 5 hours during business hours.")}
              </p>

              <hr className="my-5 border-border" />

              <h4 className="text-sm font-semibold text-primary">
                {t("Ofertas de Viaje desde Guatemala.", "Travel offers from Guatemala.")}
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-gold" /> {t("Salidas grupales mensuales", "Monthly group departures")}</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-gold" /> {t("Financiamiento disponible", "Financing available")}</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-gold" /> {t("Grupos de 10+ con descuento", "10+ groups discount")}</li>
              </ul>

              <hr className="my-5 border-border" />

              <h4 className="text-sm font-semibold text-primary">{t("Contacto Directo", "Direct Contact")}</h4>
              <p className="mt-2 text-sm text-muted-foreground">+502 3961 6185</p>
              <a href={`mailto:${COMPANY_EMAIL}`} className="text-sm text-primary hover:text-gold">
                {COMPANY_EMAIL}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* Otros destinos */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center font-display text-2xl font-bold text-primary md:text-3xl">
            {t("Otros destinos que te pueden interesar", "Other destinations you might like")}
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {destinations.filter((d) => d.slug !== dest.slug).map((d) => (
              <Link key={d.slug} to="/destinos/$slug" params={{ slug: d.slug }} className="group overflow-hidden rounded-lg border border-border bg-card">
                <img src={d.image} alt={d.name} loading="lazy" width={512} height={384} className="aspect-video w-full object-cover transition-transform group-hover:scale-105" />
                <div className="px-3 py-2">
                  <div className="text-sm font-semibold text-primary">{d.name}</div>
                  <div className="text-[11px] text-muted-foreground">{t("Desde", "From")} ${d.fromPrice}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ItineraryDialog destination={dest} open={openDialog} onClose={() => setOpenDialog(false)} />
    </>
  );
}
