import { Instagram, Facebook, Youtube, Twitter, Mail, CreditCard, Bitcoin, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { COMPANY_EMAIL } from "@/data/destinations";
import { useLang } from "@/lib/lang";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <div className="font-display text-3xl font-bold">
            Wander<span className="text-gold">lux</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-primary-foreground/70">
            {t(
              "Tu agencia de confianza en Guatemala. Paquetes todo incluido a los mejores destinos del Caribe y Latinoamérica.",
              "Your trusted agency in Guatemala. All-inclusive packages to the best Caribbean and Latin American destinations."
            )}
          </p>
          <div className="mt-5 flex gap-3">
            <a 
              href="https://www.instagram.com/wanderlux_travelers/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram" 
              className="rounded-full border border-primary-foreground/20 p-2 hover:bg-primary-foreground/10 transition-colors"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a 
              href="https://www.facebook.com/profile.php?id=61571779853292" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Facebook" 
              className="rounded-full border border-primary-foreground/20 p-2 hover:bg-primary-foreground/10 transition-colors"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold">{t("Explora", "Explore")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/destinos" className="hover:text-gold">{t("Destinos", "Destinations")}</Link></li>
            <li><Link to="/ofertas" className="hover:text-gold">{t("Ofertas", "Deals")}</Link></li>
            <li><Link to="/guia-viajero" className="hover:text-gold">{t("Guía del Viajero", "Travel Guide")}</Link></li>
            <li><Link to="/terminos-condiciones" className="hover:text-gold">{t("Términos y Condiciones", "Terms and Conditions")}</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg font-semibold">{t("Contacto", "Contact")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
            <li>WhatsApp 24/7</li>
            <li className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" />
              <a href={`mailto:${COMPANY_EMAIL}`} className="hover:text-gold">{COMPANY_EMAIL}</a>
            </li>
            <li>Guatemala</li>
          </ul>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-primary-foreground/10 bg-primary-foreground/5 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Visa / MasterCard</span>
          </div>
          <div className="flex items-center gap-2">
            <Bitcoin className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-widest">Bitcoin Accepted</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-gold" />
            <span className="text-xs font-bold uppercase tracking-widest">{t("Pago Seguro", "Secure Payment")}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">
        © 2026 Wanderlux. {t("Todos los derechos reservados.", "All rights reserved.")} · {t("Construida por", "Built by")}{" "}
        <a href="https://tekylab.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-gold hover:underline">
          Tekylab
        </a>
      </div>
    </footer>
  );
}
