import { useState } from "react";
import { X, Mail, MessageCircle, Download, Loader2 } from "lucide-react";
import { Destination, WHATSAPP_NUMBER, COMPANY_EMAIL } from "@/data/destinations";
import { useLang } from "@/lib/lang";
import { saveLeadToSheet } from "@/lib/leads.functions";

export function ItineraryDialog({
  destination,
  open,
  onClose,
}: {
  destination: Destination;
  open: boolean;
  onClose: () => void;
}) {
  const { t, lang } = useLang();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [delivery, setDelivery] = useState<"email" | "whatsapp">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const pdfAbsoluteUrl = typeof window !== "undefined"
    ? `${window.location.origin}${destination.pdfUrl}`
    : destination.pdfUrl;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !whatsapp.trim()) {
      setError(t("Completa todos los campos", "Please fill all fields"));
      return;
    }
    setLoading(true);
    try {
      await saveLeadToSheet({
        data: {
          type: "itinerary_download",
          destination: destination.name,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
          delivery,
          language: lang,
        },
      });

      if (delivery === "whatsapp") {
        const msg = encodeURIComponent(
          t(
            `Hola, soy ${firstName} ${lastName}. Solicité el itinerario de ${destination.name}. Aquí mi enlace: ${pdfAbsoluteUrl}`,
            `Hi, I'm ${firstName} ${lastName}. I requested the ${destination.name} itinerary. Here is my link: ${pdfAbsoluteUrl}`
          )
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
      } else {
        const subject = encodeURIComponent(
          t(`Itinerario ${destination.name} - Wanderlux`, `${destination.name} Itinerary - Wanderlux`)
        );
        const body = encodeURIComponent(
          t(
            `Hola ${firstName},\n\nGracias por tu interés en ${destination.name}.\n\nDescarga tu itinerario aquí: ${pdfAbsoluteUrl}\n\nSi tienes preguntas, escríbenos a ${COMPANY_EMAIL} o por WhatsApp.\n\nWanderlux`,
            `Hi ${firstName},\n\nThanks for your interest in ${destination.name}.\n\nDownload your itinerary here: ${pdfAbsoluteUrl}\n\nIf you have any questions, contact us at ${COMPANY_EMAIL} or via WhatsApp.\n\nWanderlux`
          )
        );
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      }

      // Also open the PDF directly so the user gets it instantly
      window.open(destination.pdfUrl, "_blank");
      onClose();
    } catch (err) {
      console.error(err);
      setError(t("Error al enviar. Intenta de nuevo.", "Submission failed. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-card p-6 shadow-luxe md:p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-primary"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-primary">
          <Download className="h-3.5 w-3.5" />
          {t("Itinerario gratuito", "Free itinerary")}
        </div>

        <h2 className="font-display text-2xl font-bold text-primary">
          {t("Descargar itinerario de", "Download itinerary for")} {destination.name}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t(
            "Completa tus datos y elige cómo recibir el documento PDF.",
            "Fill in your details and choose how to receive the PDF."
          )}
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder={t("Nombre", "First name")}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2.5 text-sm"
              required
              maxLength={50}
            />
            <input
              type="text"
              placeholder={t("Apellido", "Last name")}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="rounded-md border border-input bg-background px-3 py-2.5 text-sm"
              required
              maxLength={50}
            />
          </div>
          <input
            type="email"
            placeholder={t("Correo electrónico", "Email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm"
            required
            maxLength={100}
          />
          <input
            type="tel"
            placeholder={t("WhatsApp (con código país)", "WhatsApp (with country code)")}
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm"
            required
            maxLength={20}
          />

          <div>
            <label className="mb-1.5 block text-xs font-semibold text-primary">
              {t("¿Dónde quieres recibirlo?", "Where do you want to receive it?")}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDelivery("email")}
                className={`flex items-center justify-center gap-2 rounded-md border-2 px-3 py-2.5 text-sm font-semibold transition-all ${
                  delivery === "email"
                    ? "border-gold bg-gold/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40"
                }`}
              >
                <Mail className="h-4 w-4" /> {t("Correo", "Email")}
              </button>
              <button
                type="button"
                onClick={() => setDelivery("whatsapp")}
                className={`flex items-center justify-center gap-2 rounded-md border-2 px-3 py-2.5 text-sm font-semibold transition-all ${
                  delivery === "whatsapp"
                    ? "border-gold bg-gold/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:border-primary/40"
                }`}
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </button>
            </div>
          </div>

          {error && <p className="text-xs text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {t("Recibir itinerario", "Get itinerary")}
          </button>

          <p className="text-center text-[11px] text-muted-foreground">
            {t(
              "Al continuar, aceptas que un asesor te contacte para personalizar tu viaje.",
              "By continuing, you agree to be contacted by a travel advisor."
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
