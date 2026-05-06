import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Search, Plane, Hotel, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/hero.jpg";
import { destinations, WHATSAPP_URL } from "@/data/destinations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wanderlux | Agencia de Viajes Especialista en Todo Incluido" },
      { name: "description", content: "Agencia de Viajes especialista en paquetes todo incluido. Descubre los mejores destinos para tus vacaciones: Punta Cana, Cancún, Aruba y más." },
      { property: "og:title", content: "Wanderlux | Agencia de Viajes de Lujo" },
      { property: "og:description", content: "Paquetes todo incluido a los mejores destinos del Caribe y Latinoamérica." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [selectedSlug, setSelectedSlug] = useState("");

  const handleSearch = () => {
    if (selectedSlug) {
      navigate({ to: "/destinos/$slug", params: { slug: selectedSlug } });
    } else {
      navigate({ to: "/destinos" });
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Resort de lujo al atardecer"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-6 md:py-36 lg:py-44">
          <div className="max-w-3xl text-primary-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-emerald" /> Especialistas en viajes de lujo
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight md:text-6xl">
              Agencia de Viajes Especialista en Paquetes Todo Incluido.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-primary-foreground/85 md:text-lg">
              Diseñamos experiencias inolvidables al Caribe y Latinoamérica. Vuelos, hoteles 5★, traslados y tours en un solo paquete.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-emerald px-6 py-3 text-sm font-semibold text-emerald-foreground shadow-luxe hover:opacity-90"
              >
                Cotiza ya por WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/destinos"
                className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/40 bg-primary-foreground/10 px-6 py-3 text-sm font-semibold text-primary-foreground backdrop-blur hover:bg-primary-foreground/20"
              >
                Ver destinos
              </Link>
            </div>
          </div>

          {/* Search box */}
          <div className="mt-12 rounded-xl border border-primary-foreground/20 bg-background/95 p-4 shadow-luxe backdrop-blur md:mt-16 md:p-6">
            <div className="grid gap-3 md:grid-cols-5">
              <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
                Destino
                <select
                  value={selectedSlug}
                  onChange={(e) => setSelectedSlug(e.target.value)}
                  className="rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground"
                >
                  <option value="">Cualquier destino</option>
                  {destinations.map((d) => (
                    <option key={d.slug} value={d.slug}>{d.name}</option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
                Fecha de salida
                <input type="date" className="rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground" />
              </label>
              <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
                Fecha de regreso
                <input type="date" className="rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground" />
              </label>
              <label className="flex flex-col gap-1 text-xs font-medium text-muted-foreground">
                Viajeros
                <select className="rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground">
                  <option>2 adultos</option>
                  <option>1 adulto</option>
                  <option>2 adultos + niños</option>
                  <option>Grupo</option>
                </select>
              </label>
              <button
                type="button"
                onClick={handleSearch}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                <Search className="h-4 w-4" /> Buscar viaje
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINOS DESTACADOS */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald">Destinos estrella</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-primary md:text-4xl">
              Descubre los Mejores Destinos para tus Vacaciones.
            </h2>
          </div>
          <Link to="/destinos" className="text-sm font-semibold text-primary hover:text-emerald">
            Ver todos →
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
                  <p className="text-xs text-primary-foreground/80">{d.tagline}</p>
                </div>
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-sm font-medium text-foreground">{d.seoTitle}</span>
                <ArrowRight className="h-4 w-4 text-emerald transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center font-display text-3xl font-bold text-primary md:text-4xl">
            Todo en un solo paquete.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
            Sin sorpresas, sin trámites. Nosotros nos encargamos de cada detalle.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: Plane, title: "Vuelos", desc: "Aerolíneas premium" },
              { Icon: Hotel, title: "Hotel Resort", desc: "Categorías 4★ y 5★" },
              { Icon: MapPin, title: "Traslados", desc: "Privados puerta a puerta" },
              { Icon: Sparkles, title: "Tours", desc: "Las mejores experiencias" },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-border bg-card p-6 text-center shadow-card">
                <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald/15 text-emerald">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-primary">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
