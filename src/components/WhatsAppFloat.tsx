import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL, getWhatsAppTextForPath, getWhatsAppUrl } from "@/data/destinations";
import { useLang } from "@/lib/lang";

export function WhatsAppFloat() {
  const { lang, t } = useLang();
  const [whatsappHref, setWhatsappHref] = useState(WHATSAPP_URL);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateHref = () => {
      const path = window.location.pathname;
      setWhatsappHref(getWhatsAppUrl(getWhatsAppTextForPath(path, lang)));
    };

    updateHref();

    const handleLocationChange = () => updateHref();
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("locationchange", handleLocationChange);

    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args: Parameters<History["pushState"]>) {
      const result = originalPushState.apply(this, args);
      window.dispatchEvent(new Event("locationchange"));
      return result;
    };

    history.replaceState = function (...args: Parameters<History["replaceState"]>) {
      const result = originalReplaceState.apply(this, args);
      window.dispatchEvent(new Event("locationchange"));
      return result;
    };

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("locationchange", handleLocationChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, [lang]);

  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground shadow-luxe transition-transform hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">{t("Cotiza por WhatsApp", "Quote on WhatsApp")}</span>
    </a>
  );
}
