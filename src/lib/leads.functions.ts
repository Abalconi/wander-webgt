// Webhook URL de Google Apps Script (hardcoded como respaldo seguro)
const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbxdmMrLE9NfWU0w8Xg2kwsGdMf_5OhEByYrm6VpBONLqcxQmr8yvTnoiPoTH9TlgzKU/exec";

export interface LeadData {
  type: "search" | "itinerary_download";
  destination?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  whatsapp?: string;
  delivery?: string;
  language?: string;
  departureDate?: string;
  returnDate?: string;
  travelers?: string;
}

/**
 * Envía un lead al webhook de Google Apps Script.
 *
 * Usa navigator.sendBeacon cuando está disponible (sobrevive navegaciones de página).
 * Fallback a fetch con text/plain para evitar CORS preflight.
 */
export async function saveLeadToSheet(data: LeadData): Promise<{ ok: boolean; error?: string }> {
  const payload = JSON.stringify({
    timestamp: new Date().toISOString(),
    type: data.type ?? "",
    destination: data.destination ?? "",
    firstName: data.firstName ?? "",
    lastName: data.lastName ?? "",
    email: data.email ?? "",
    whatsapp: data.whatsapp ?? "",
    delivery: data.delivery ?? "",
    language: data.language ?? "es",
    departureDate: data.departureDate ?? "",
    returnDate: data.returnDate ?? "",
    travelers: data.travelers ?? "",
  });

  // sendBeacon: diseñado para disparar-y-olvidar incluso al navegar
  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    const blob = new Blob([payload], { type: "text/plain;charset=utf-8" });
    const sent = navigator.sendBeacon(WEBHOOK_URL, blob);
    if (sent) return { ok: true };
    // Si sendBeacon devuelve false (cola llena), cae al fetch
  }

  // Fallback: fetch normal
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      redirect: "follow",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: payload,
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`Webhook failed [${res.status}]: ${body}`);
      return { ok: false, error: `webhook_${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.error("Webhook exception:", err);
    return { ok: false, error: "exception" };
  }
}
