import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import { destinations, WHATSAPP_URL } from "@/data/destinations";

export function Header() {
  const [open, setOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);

  const navLink =
    "text-sm font-medium text-primary/80 hover:text-primary transition-colors";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold tracking-tight text-primary">
            Wander<span className="text-emerald">lux</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link to="/" className={navLink} activeOptions={{ exact: true }} activeProps={{ className: "text-primary font-semibold" }}>
            Inicio
          </Link>
          <div
            className="relative"
            onMouseEnter={() => setDestOpen(true)}
            onMouseLeave={() => setDestOpen(false)}
          >
            <Link
              to="/destinos"
              className={`${navLink} flex items-center gap-1`}
              activeProps={{ className: "text-primary font-semibold" }}
            >
              Destinos <ChevronDown className="h-4 w-4" />
            </Link>
            {destOpen && (
              <div className="absolute left-0 top-full w-64 pt-2">
                <div className="rounded-lg border border-border bg-card p-2 shadow-luxe">
                  {destinations.map((d) => (
                    <Link
                      key={d.slug}
                      to="/destinos/$slug"
                      params={{ slug: d.slug }}
                      className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-secondary"
                    >
                      {d.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link to="/ofertas" className={navLink} activeProps={{ className: "text-primary font-semibold" }}>
            Ofertas
          </Link>
          <Link to="/guia-viajero" className={navLink} activeProps={{ className: "text-primary font-semibold" }}>
            Guía del Viajero
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-md bg-emerald px-4 py-2 text-sm font-semibold text-emerald-foreground shadow-card transition-all hover:opacity-90 md:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            Cotiza ya por WhatsApp
          </a>
          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menú"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="flex flex-col gap-1 p-4">
            <Link to="/" className="rounded-md px-3 py-2 text-sm hover:bg-secondary" onClick={() => setOpen(false)}>Inicio</Link>
            <Link to="/destinos" className="rounded-md px-3 py-2 text-sm hover:bg-secondary" onClick={() => setOpen(false)}>Destinos</Link>
            <Link to="/ofertas" className="rounded-md px-3 py-2 text-sm hover:bg-secondary" onClick={() => setOpen(false)}>Ofertas</Link>
            <Link to="/guia-viajero" className="rounded-md px-3 py-2 text-sm hover:bg-secondary" onClick={() => setOpen(false)}>Guía del Viajero</Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-emerald px-4 py-2.5 text-sm font-semibold text-emerald-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              Cotiza ya por WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
