import { MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/data/destinations";

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Cotiza por WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-emerald px-5 py-3 text-sm font-semibold text-emerald-foreground shadow-luxe transition-transform hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">Cotiza por WhatsApp</span>
    </a>
  );
}
