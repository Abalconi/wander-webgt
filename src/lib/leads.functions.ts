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
console.log("leads.functions.ts loaded");

export const saveLeadToSheet = createServerFn({ method: "POST" })
  .inputValidator((input) => LeadSchema.parse(input))
  .handler(async ({ data }): Promise<{ ok: boolean; error?: string }> => {
    console.log("saveLeadToSheet handler started", data);
    const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL || 
                       (import.meta as any).env.VITE_GOOGLE_SHEETS_WEBHOOK_URL ||
                       (import.meta as any).env.GOOGLE_SHEETS_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("GOOGLE_SHEETS_WEBHOOK_URL is not configured in process.env or import.meta.env");
      console.log("Current env keys:", Object.keys(process.env));
      return { ok: false, error: "missing_webhook_url" };
    }

    const payload = JSON.stringify({
      timestamp: new Date().toISOString(),
      type: data.type,
      destination: data.destination,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      whatsapp: data.whatsapp,
      delivery: data.delivery,
      language: data.language,
      departureDate: data.departureDate,
      returnDate: data.returnDate,
      travelers: data.travelers,
    });

    try {
      console.log(`Attempting fetch to: ${webhookUrl}`);
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

      console.log(`Google Sheets lead saved: ${data.type} ${data.destination}`);
      return { ok: true };
    } catch (err) {
      console.error("Google Sheets webhook exception:", err);
      return { ok: false, error: "exception" };
    }
  });
