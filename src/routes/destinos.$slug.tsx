import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plane, Hotel, Car, Compass, Check, MessageCircle, Download, MapPin, Camera, CreditCard, Send, Bitcoin, Landmark, ShieldCheck, Sparkles } from "lucide-react";
import { destinations, getDestination, getWhatsAppUrl, COMPANY_EMAIL } from "@/data/destinations";
import { ItineraryDialog } from "@/components/ItineraryDialog";
import { useLang } from "@/lib/lang";
import { formatPrice } from "@/lib/utils";

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

export function DestinoDetalle() {
  const { dest } = Route.useLoaderData();
  const { t, lang } = useLang();
  const [openDialog, setOpenDialog] = useState(false);

  const includes = [
    { Icon: Plane, title: t("Vuelos", "Flights"), desc: t("Ida y vuelta desde cualquier parte del mundo", "Round trip from anywhere in the world") },
    { 
      Icon: Hotel, 
      title: t("Hotel Resort", "Resort Hotel"), 
      desc: dest.boarding === "all-inclusive" 
        ? t("Alojamiento todo incluido", "All-inclusive lodging")
        : dest.boarding === "breakfast"
        ? t("Alojamiento con desayunos", "Lodging with breakfast")
        : t("No incluye alimentos", "Meals not included")
    },
    { Icon: Car, title: t("Traslados", "Transfers"), desc: t("Aeropuerto-Hotel-Aeropuerto", "Airport-Hotel-Airport") },
    { 
      Icon: dest.slug === "isla-mucura" ? Sparkles : Compass, 
      title: dest.slug === "isla-mucura" ? t("Piscina Privada", "Private Pool") : "Tours", 
      desc: dest.slug === "isla-mucura" 
        ? t("Bungalow frente al mar con piscina privada", "Beachfront bungalow with private pool")
        : t("Una excursión de cortesía", "A complimentary excursion") 
    },
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
              {t("Desde", "From")} {formatPrice(dest.fromPrice, lang)}
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
              {dest.name}
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
              {dest.attractions.map((a: string) => (
                <span key={a} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-primary">
                  <MapPin className="h-3 w-3 text-gold" /> {a}
                </span>
              ))}
            </div>



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
                <span className="font-display text-4xl font-bold text-primary">{formatPrice(dest.fromPrice, lang)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {t("por persona", "per person")} / {dest.nights} {t("noches", "nights")}
              </p>
              <a
                href={getWhatsAppUrl(
                  t(
                    `Hola, quiero más info para el paquete a ${dest.name}`,
                    `Hello, I want more info for the package to ${dest.name}`
                  )
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-4 py-3 text-sm font-bold text-gold-foreground hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" /> {t("Cotiza por WhatsApp", "Quote on WhatsApp")}
              </a>
              <p className="mt-2 text-center text-[11px] text-muted-foreground">
                {t("Respuesta en menos de 5 horas en horario laboral.", "Response in less than 5 hours during business hours.")}
              </p>
              
              {/* Trust Badges under CTA */}
              <div className="mt-4 flex flex-col items-center gap-3 rounded-lg bg-secondary/30 p-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  {t("Reserva de forma segura", "Secure Booking")}
                </p>
                <div className="flex items-center gap-4">
                   <img src="https://logos-world.net/wp-content/uploads/2020/04/Visa-Logo.png" alt="Visa" className="h-3.5 w-auto" />
                   <img src="https://logos-world.net/wp-content/uploads/2020/09/Mastercard-Logo.png" alt="Mastercard" className="h-5 w-auto" />
                   <img src="https://logos-world.net/wp-content/uploads/2020/08/Bitcoin-Logo.png" alt="Bitcoin" className="h-5 w-auto" />
                </div>
                <p className="text-center text-[10px] font-medium leading-tight text-muted-foreground">
                  {t("Aceptamos todas las tarjetas, transferencias bancarias y Bitcoin.", "We accept all cards, bank transfers, and Bitcoin.")}
                </p>
              </div>

              <hr className="my-5 border-border" />

              <h4 className="text-sm font-semibold text-primary">
                {t("Asesoría Experta y Pago Flexible", "Expert Advice and Flexible Payment")}
              </h4>
              <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-gold" /> {t("Págalo hasta en 10 cuotas sin recargo", "Pay in up to 10 interest-free installments")}</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-gold" /> {t("Asesoría personalizada y acompañamiento", "Personalized advice and support")}</li>
                <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-gold" /> {t("Seguro de viaje con cobertura integral (opcional)", "Travel insurance with comprehensive coverage (optional)")}</li>
              </ul>

              <div className="mt-4 text-center">
                <Link to="/terminos-condiciones" className="text-[10px] text-muted-foreground hover:text-gold underline underline-offset-2 transition-colors">
                  {t("Al reservar, aceptas nuestros Términos y Condiciones", "By booking, you accept our Terms and Conditions")}
                </Link>
              </div>

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

      {/* Reserva en 3 pasos */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <h2 className="text-center font-display text-3xl font-bold text-primary md:text-4xl">
          {t("Reserva en 3 pasos", "Book in 3 steps")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          {t("Tu lugar garantizado en menos de 24 horas.", "Your spot guaranteed in less than 24 hours.")}
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {/* Paso 1 */}
          <div className="relative flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 text-gold shadow-sm">
              <Camera className="h-10 w-10" />
            </div>
            <div className="absolute right-0 top-10 hidden w-full translate-x-1/2 border-t-2 border-dashed border-border md:block" />
            <h3 className="mt-6 font-display text-xl font-bold text-primary">{t("1. Asegura tu lugar", "1. Secure your spot")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("Envía una foto de tu pasaporte por WhatsApp. Tu reserva queda garantizada por 24 horas.", "Send a photo of your passport via WhatsApp. Your reservation is guaranteed for 24 hours.")}
            </p>
            <a
              href={getWhatsAppUrl(
                t(
                  `Hola, quiero más info para el paquete a ${dest.name}`,
                  `Hello, I want more info for the package to ${dest.name}`
                )
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-gold-foreground shadow-sm hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" />
              {t("Enviar mi pasaporte por WhatsApp", "Send my passport via WhatsApp")}
            </a>
          </div>

          {/* Paso 2 */}
          <div className="relative flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 text-gold shadow-sm">
              <CreditCard className="h-10 w-10" />
            </div>
            <div className="absolute right-0 top-10 hidden w-full translate-x-1/2 border-t-2 border-dashed border-border md:block" />
            <h3 className="mt-6 font-display text-xl font-bold text-primary">{t("2. Confirma tu pago", "2. Confirm your payment")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("Paga mediante depósito, transferencia o tarjeta y envíanos tu comprobante.", "Pay via deposit, transfer, or card and send us your receipt.")}
            </p>
          </div>

          {/* Paso 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald/10 text-emerald shadow-sm">
              <Send className="h-10 w-10" />
            </div>
            <h3 className="mt-6 font-display text-xl font-bold text-primary">{t("3. ¡Listo para viajar!", "3. Ready to travel!")}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("Recibe tus documentos de viaje digitales en menos de 24 horas tras confirmar tu pago.", "Receive your digital travel documents in less than 24 hours after confirming payment.")}
            </p>
            <p className="mt-4 text-xs font-semibold text-emerald">
               {t("✓ Más de 100 viajeros recibieron sus documentos hoy mismo", "✓ More than 100 travelers received their documents today")}
            </p>
          </div>
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
                  <div className="text-[11px] text-muted-foreground">{t("Desde", "From")} {formatPrice(d.fromPrice, lang)}</div>
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
