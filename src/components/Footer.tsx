import { Instagram, Facebook, Youtube, Twitter } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <div className="font-display text-3xl font-bold">
            Wander<span className="text-emerald">lux</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-primary-foreground/70">
            Agencia de viajes especialista en paquetes todo incluido a los mejores destinos del Caribe y Latinoamérica.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#" aria-label="Instagram" className="rounded-full border border-primary-foreground/20 p-2 hover:bg-primary-foreground/10"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="rounded-full border border-primary-foreground/20 p-2 hover:bg-primary-foreground/10"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="YouTube" className="rounded-full border border-primary-foreground/20 p-2 hover:bg-primary-foreground/10"><Youtube className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="rounded-full border border-primary-foreground/20 p-2 hover:bg-primary-foreground/10"><Twitter className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold">Explora</h4>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/destinos" className="hover:text-emerald">Destinos</Link></li>
            <li><Link to="/ofertas" className="hover:text-emerald">Ofertas</Link></li>
            <li><Link to="/guia-viajero" className="hover:text-emerald">Guía del Viajero</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold">Contacto</h4>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
            <li>WhatsApp 24/7</li>
            <li>info@wanderlux.travel</li>
            <li>Guatemala</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">
        © 2026 Wanderlux. Todos los derechos reservados.
      </div>
    </footer>
  );
}
