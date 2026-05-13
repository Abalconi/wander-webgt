// Webhook URL de Google Apps Script
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
 * Envía un lead directamente al webhook de Google Apps Script.
 * Usa Content-Type: text/plain para evitar el preflight de CORS.
 */
export async function saveLeadToSheet(data: LeadData): Promise<{ ok: boolean; error?: string }> {
  const payload = {
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
  };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      redirect: "follow",
      // text/plain evita el preflight de CORS en Google Apps Script
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`Webhook failed [${res.status}]: ${body}`);
      return { ok: false, error: `webhook_${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.error("Webhook exception:", err);
    return { ok: false, error: "exception" };
  }
}
