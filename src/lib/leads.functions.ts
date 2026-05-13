import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const LeadSchema = z.object({
  type: z.enum(["search", "itinerary_download"]),
  destination: z.string().max(100).optional().default(""),
  firstName: z.string().max(50).optional().default(""),
  lastName: z.string().max(50).optional().default(""),
  email: z.string().max(100).optional().default(""),
  whatsapp: z.string().max(30).optional().default(""),
  delivery: z.string().max(30).optional().default(""),
  language: z.string().max(5).optional().default("es"),
  departureDate: z.string().max(30).optional().default(""),
  returnDate: z.string().max(30).optional().default(""),
  travelers: z.string().max(500).optional().default(""),
});

export type LeadData = z.infer<typeof LeadSchema>;

/**
 * Envía un lead al webhook de Google Apps Script desde el backend.
 */
export const saveLeadToSheet = createServerFn({ method: "POST" })
  .handler(async ({ data }): Promise<{ ok: boolean; error?: string }> => {
    // Validamos los datos manualmente dentro del handler para evitar problemas de versión
    const validatedData = LeadSchema.parse(data);
    
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || 
                       (import.meta as any).env.VITE_GOOGLE_SHEETS_WEBHOOK_URL ||
                       (import.meta as any).env.GOOGLE_SHEETS_WEBHOOK_URL;

    console.log("Using Webhook URL:", webhookUrl);

    if (!webhookUrl) {
      console.error("GOOGLE_SHEETS_WEBHOOK_URL is not configured in process.env or import.meta.env");
      return { ok: false, error: "missing_webhook_url" };
    }

    const payload = JSON.stringify({
      ...validatedData,
      timestamp: new Date().toLocaleString("es-GT", { timeZone: "America/Guatemala" }),
    });

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        redirect: "follow",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: payload,
      });

      const body = await res.text().catch(() => "");

      if (!res.ok) {
        console.error(`Google Sheets webhook failed [${res.status}]: ${body}`);
        return { ok: false, error: `webhook_${res.status}` };
      }

      console.log(`Google Sheets lead saved: ${validatedData.type} ${validatedData.destination}`);
      return { ok: true };
    } catch (err) {
      console.error("Google Sheets webhook exception:", err);
      return { ok: false, error: "exception" };
    }
  });
