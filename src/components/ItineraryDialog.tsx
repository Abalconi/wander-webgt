import { useState, useEffect } from "react";
import { X, Download, Loader2 } from "lucide-react";
import { Destination } from "@/data/destinations";
import { useLang } from "@/lib/lang";
import { saveLeadToSheet } from "@/lib/leads.functions";

const STORAGE_KEY = "wlx_user_data";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.firstName) setFirstName(data.firstName);
        if (data.lastName) setLastName(data.lastName);
        if (data.email) setEmail(data.email);
        if (data.whatsapp) setWhatsapp(data.whatsapp);
      } catch (e) {
        console.error("Error parsing saved user data", e);
      }
    }
  }, []);

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

    // Open the PDF directly so the user gets it instantly and it's not blocked by popup preventers
    const pdfAbsoluteUrl = `${window.location.origin}${destination.pdfUrl}`;
    console.log("Opening PDF:", pdfAbsoluteUrl);
    window.open(pdfAbsoluteUrl, "_blank");

    setLoading(true);
    try {
      const result = await saveLeadToSheet({
        type: "itinerary_download",
        destination: destination.name,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim(),
        language: lang,
      });

      console.log("saveLeadToSheet result:", result);

      if (!result.ok) {
        console.warn("Lead saving failed but PDF was already opened:", result.error);
      }
      
      // Save to localStorage for future use
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        whatsapp: whatsapp.trim(),
      }));

      onClose();
    } catch (err) {
      console.error("Error saving lead:", err);
      // We don't show the error to the user anymore because the PDF is already opening
      onClose();
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
            "Completa tus datos y descarga el documento PDF.",
            "Complete your details and download the PDF document."
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
            {t("Descargar ahora", "Download now")}
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
