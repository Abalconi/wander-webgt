import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/data/destinations";
import { useLang } from "@/lib/lang";

export function WhatsAppFloat() {
  const { t } = useLang();
  return (
    <a
      href={WHATSAPP_URL}
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
