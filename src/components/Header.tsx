import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown, MessageCircle, Globe } from "lucide-react";
import { destinations, WHATSAPP_URL } from "@/data/destinations";
import { useLang } from "@/lib/lang";

export function Header() {
  const [open, setOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  const navLink =
    "text-sm font-medium text-primary/80 hover:text-primary transition-colors";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold tracking-tight text-primary">
            Wander<span className="text-gold">lux</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          <Link to="/" className={navLink} activeOptions={{ exact: true }} activeProps={{ className: "text-primary font-semibold" }}>
            {t("Inicio", "Home")}
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
              {t("Destinos", "Destinations")} <ChevronDown className="h-4 w-4" />
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
            {t("Ofertas", "Deals")}
          </Link>
          <Link to="/guia-viajero" className={navLink} activeProps={{ className: "text-primary font-semibold" }}>
            {t("Guía del Viajero", "Travel Guide")}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="hidden items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold text-primary hover:bg-secondary md:inline-flex"
            aria-label="Change language"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang === "es" ? "ES" : "EN"}
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-gold-foreground shadow-card transition-all hover:opacity-90 md:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            {t("Cotiza por WhatsApp", "Quote on WhatsApp")}
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
            <Link to="/" className="rounded-md px-3 py-2 text-sm hover:bg-secondary" onClick={() => setOpen(false)}>{t("Inicio", "Home")}</Link>
            <Link to="/destinos" className="rounded-md px-3 py-2 text-sm hover:bg-secondary" onClick={() => setOpen(false)}>{t("Destinos", "Destinations")}</Link>
            <Link to="/ofertas" className="rounded-md px-3 py-2 text-sm hover:bg-secondary" onClick={() => setOpen(false)}>{t("Ofertas", "Deals")}</Link>
            <Link to="/guia-viajero" className="rounded-md px-3 py-2 text-sm hover:bg-secondary" onClick={() => setOpen(false)}>{t("Guía del Viajero", "Travel Guide")}</Link>
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              className="mt-2 inline-flex items-center justify-center gap-1 rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary"
            >
              <Globe className="h-4 w-4" />
              {lang === "es" ? "Switch to English" : "Cambiar a Español"}
            </button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              {t("Cotiza por WhatsApp", "Quote on WhatsApp")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
