import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Search, Plane, Hotel, MapPin, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/hero.jpg";
import { destinations, getWhatsAppUrl } from "@/data/destinations";
import { TravelersPicker, TravelersValue } from "@/components/TravelersPicker";
import { useLang } from "@/lib/lang";
import { saveLeadToSheet } from "@/lib/leads.functions";
import { formatPrice, cn } from "@/lib/utils";
import { format, addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wanderlux | Agencia de Viajes Especialista en Todo Incluido" },
      { name: "description", content: "Agencia de Viajes en Guatemala especialista en paquetes todo incluido. Punta Cana, Cancún, Aruba y más." },
      { property: "og:title", content: "Wanderlux | Agencia de Viajes" },
      { property: "og:description", content: "Paquetes todo incluido a los mejores destinos del Caribe y Latinoamérica." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Index,
});

export function Index() {
  const { t, lang } = useLang();
  const today = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const [selectedSlug, setSelectedSlug] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const departureDate = dateRange?.from ? format(dateRange.from, "yyyy-MM-dd") : "";
  const returnDate = dateRange?.to ? format(dateRange.to, "yyyy-MM-dd") : "";

  const handleDateSelect = (range: DateRange | undefined) => {
    setDateRange(range);
  };
  const [travelers, setTravelers] = useState<TravelersValue>({
    rooms: [{ adults: 2, children: 0, childrenAges: [] }],
  });

  const handleSearch = async () => {
    const dest = destinations.find((d) => d.slug === selectedSlug);
    await saveLeadToSheet({
      data: {
        type: "search",
        destination: dest?.name ?? t("Cualquier destino", "Any destination"),
        departureDate,
        returnDate,
        travelers: JSON.stringify(travelers.rooms),
        language: lang,
      },
    }).catch(() => null);

    if (selectedSlug) {
      navigate({ to: "/destinos/$slug", params: { slug: selectedSlug } });
    } else {
      navigate({ to: "/destinos" });
    }
  };

  return (
    <>
      <section className="relative isolate">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={heroImg}
            alt="Resort frente al mar"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-36 lg:py-44">
          <div className="max-w-3xl text-primary-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-gold" /> {t("Tu agencia de confianza en Guatemala", "Your trusted agency in Guatemala")}
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl">
              {t("Agencia de Viajes Especialista en Paquetes Todo Incluido.", "Travel Agency Specializing in All-Inclusive Packages.")}
            </h1>
            <p className="mt-5 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
              {t(
                "Diseñamos experiencias inolvidables al Caribe y Latinoamérica. Vuelos, hoteles, traslados y tours en un solo paquete.",
                "We design unforgettable experiences in the Caribbean and Latin America. Flights, hotels, transfers and tours in one package."
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={getWhatsAppUrl(
                  t(
                    "Hola, quiero más info sobre los paquetes",
                    "Hello, I want more info about the packages"
                  )
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-luxe hover:opacity-90"
              >
                {t("Cotiza por WhatsApp", "Quote on WhatsApp")} <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/destinos"
                className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/40 bg-primary-foreground/10 px-6 py-3 text-sm font-semibold text-primary-foreground backdrop-blur hover:bg-primary-foreground/20"
              >
                {t("Ver destinos", "See destinations")}
              </Link>
            </div>
          </div>

          <div className="mt-12 rounded-xl border border-primary-foreground/20 bg-background/95 p-4 shadow-luxe backdrop-blur md:mt-16 md:p-6">
            <div className="grid gap-3 md:grid-cols-5">
              <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
                {t("Destino", "Destination")}
                <select
                  value={selectedSlug}
                  onChange={(e) => setSelectedSlug(e.target.value)}
                  className="rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground"
                >
                  <option value="">{t("Cualquier destino", "Any destination")}</option>
                  {destinations.map((d) => (
                    <option key={d.slug} value={d.slug}>{d.name}</option>
                  ))}
                </select>
              </label>
              <div className="flex flex-col gap-1 text-xs font-medium text-muted-foreground md:col-span-2">
                {t("Fechas de viaje", "Travel dates")}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal py-5.5",
                        !dateRange?.from && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 text-gold" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>{t("Selecciona fechas", "Select dates")}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={handleDateSelect}
                      numberOfMonths={2}
                      disabled={{ before: new Date() }}
                      className="rounded-md border border-border"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
                {t("Viajeros", "Travelers")}
                <TravelersPicker value={travelers} onChange={setTravelers} />
              </div>
              <button
                type="button"
                onClick={handleSearch}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                <Search className="h-4 w-4" /> {t("Buscar viaje", "Search trip")}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center font-display text-3xl font-bold text-primary md:text-4xl">
            {t("Todo en un solo paquete.", "Everything in one package.")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            {t("Sin sorpresas, sin trámites. Nosotros nos encargamos de cada detalle.", "No surprises, no paperwork. We handle every detail.")}
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: Plane, title: t("Vuelos", "Flights"), desc: t("Aerolíneas premium", "Premium airlines") },
              { Icon: Hotel, title: t("Hotel Resort", "Resort Hotel"), desc: t("Todo incluido o solo desayunos", "All-inclusive or breakfast only") },
              { Icon: MapPin, title: t("Traslados", "Transfers"), desc: t("Privados puerta a puerta", "Private door to door") },
              { Icon: Sparkles, title: t("Tours", "Tours"), desc: t("Las mejores experiencias", "The best experiences") },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6 text-center shadow-card">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-primary">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios / Reseñas */}
      <section className="py-24 bg-background overflow-hidden border-t border-border">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">{t("Experiencias Reales", "Real Experiences")}</p>
            <h2 className="mt-2 font-display text-4xl font-bold text-primary md:text-5xl">
              {t("Clientes Satisfechos", "Satisfied Customers")}
            </h2>
            <div className="mt-4 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold text-gold" />
              ))}
            </div>
          </div>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {[
                {
                  name: "Karen Eunice Morales",
                  location: "Guatemala",
                  comment: "Muy buena atención de parte de todo el equipo. Recomendados.",
                  commentEn: "Great attention from the whole team. Recommended.",
                  stars: 5,
                  dest: "Atención Premium",
                  destEn: "Premium Service"
                },
                {
                  name: "Amelia Ruano",
                  location: "Guatemala",
                  comment: "Recomiendo la agencia, dan un acompañamiento muy personalizado, Leslie siempre estuvo pendiente de que todo marchará bien, muy organizado.",
                  commentEn: "I recommend the agency, they provide very personalized support, Leslie was always looking out for everything to go well, very organized.",
                  stars: 5,
                  dest: "Acompañamiento",
                  destEn: "Personalized Support"
                },
                {
                  name: "Alejandro Santa Cruz",
                  location: "Guatemala",
                  comment: "Excelente el apoyo que me dieron. La gestión de los planes fue increíble. Gracias de nuevo.",
                  commentEn: "Excellent support they gave me. The management of the plans was incredible. Thanks again.",
                  stars: 5,
                  dest: "Gestión de Viaje",
                  destEn: "Travel Management"
                },
                {
                  name: "Mazlin López",
                  location: "Guatemala",
                  comment: "Aruba es un lugar muy bonito, hermosas playas, ofrece variedad de Tours para conocer todo. Gracias por la guía y acompañamiento.",
                  commentEn: "Aruba is a very beautiful place, beautiful beaches, offers a variety of Tours to see everything. Thanks for the guidance and support.",
                  stars: 5,
                  dest: "Aruba",
                  destEn: "Aruba"
                },
                {
                  name: "Cesar Asij",
                  location: "Guatemala",
                  comment: "Agencia de viajes WanderLux, asesoría gratis las 24 hrs, recomendado para cualquier viaje fuera del país 👌",
                  commentEn: "WanderLux travel agency, free 24-hour advice, recommended for any trip outside the country 👌",
                  stars: 5,
                  dest: "Asesoría 24/7",
                  destEn: "24/7 Assistance"
                },
                {
                  name: "David de Leon",
                  location: "Guatemala",
                  comment: "Fue una bonita experiencia de viaje, estuvieron atentos y cumplieron todo lo estipulado.",
                  commentEn: "It was a nice travel experience, they were attentive and fulfilled everything stipulated.",
                  stars: 5,
                  dest: "Viajero Satisfecho",
                  destEn: "Satisfied Traveler"
                },
                {
                  name: "Silvia Corado",
                  location: "Guatemala",
                  comment: "Excelente servicio buena atención lo recomiendo al 100%. Personal muy amable.",
                  commentEn: "Excellent service, good attention, I recommend it 100%. Very friendly staff.",
                  stars: 5,
                  dest: "Servicio al Cliente",
                  destEn: "Customer Service"
                },
                {
                  name: "Santos delmar González",
                  location: "Guatemala",
                  comment: "Fue una muy bonita experiencia y contamos con un muy buen apoyo desde principio hasta el transcurso del viaje. MUY EXCELENTE. 💯",
                  commentEn: "It was a very nice experience and we had very good support from the beginning until the course of the trip. VERY EXCELLENT. 💯",
                  stars: 5,
                  dest: "Viajero Wanderlux",
                  destEn: "Wanderlux Traveler"
                }
              ].map((tst, idx) => (
                <CarouselItem key={idx} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full rounded-2xl bg-primary p-8 border border-primary/10 shadow-xl flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
                    <div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(tst.stars)].map((_, i) => (
                          <svg key={i} className="h-4 w-4 fill-gold text-gold" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="italic leading-relaxed text-white/90 mb-6 text-sm">
                        "{lang === "en" ? tst.commentEn : tst.comment}"
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold font-bold text-sm">
                        {tst.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">{tst.name}</h4>
                        <p className="text-[10px] text-gold uppercase tracking-widest font-semibold">
                          {lang === "en" ? (tst.destEn || tst.dest) : tst.dest}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12 border-border bg-background hover:bg-gold hover:text-primary transition-all text-primary h-12 w-12 shadow-sm" />
              <CarouselNext className="-right-12 border-border bg-background hover:bg-gold hover:text-primary transition-all text-primary h-12 w-12 shadow-sm" />
            </div>
          </Carousel>
          
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground italic">
              {t("✓ Más de 500 familias guatemaltecas han confiado su viaje a Wanderlux este año.", "✓ More than 500 Guatemalan families have trusted Wanderlux with their trip this year.")}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">{t("Destinos estrella", "Top destinations")}</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-primary md:text-4xl">
              {t("Descubre los Mejores Destinos para tus Vacaciones.", "Discover the Best Destinations for Your Vacation.")}
            </h2>
          </div>
          <Link to="/destinos" className="text-sm font-semibold text-primary hover:text-gold">
            {t("Ver todos →", "See all →")}
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.slice(0, 6).map((d) => (
            <Link
              key={d.slug}
              to="/destinos/$slug"
              params={{ slug: d.slug }}
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-luxe"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={d.image} alt={d.name} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                <div className="absolute bottom-4 left-4 text-primary-foreground">
                  <h3 className="font-display text-2xl font-bold">{d.name}</h3>
                  <p className="text-xs text-primary-foreground/80">{lang === "en" ? d.taglineEn : d.tagline}</p>
                </div>
                <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-foreground shadow">
                  {t("Desde", "From")} {formatPrice(d.fromPrice, lang)}
                </span>
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {d.boarding === "all-inclusive" ? t("Todo Incluido", "All Inclusive") : t("Solo Desayunos", "Breakfast Only")}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 text-gold transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
