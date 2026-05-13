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

export const saveLeadToSheet = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => LeadSchema.parse(data))
  .handler(async ({ data }) => {
    const WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL || process.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || (import.meta as any).env?.VITE_GOOGLE_SHEETS_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbxdmMrLE9NfWU0w8Xg2kwsGdMf_5OhEByYrm6VpBONLqcxQmr8yvTnoiPoTH9TlgzKU/exec";
    if (!WEBHOOK_URL) {
      console.error("Missing GOOGLE_SHEETS_WEBHOOK_URL");
      return { ok: false, error: "config" };
    }

    const payload = {
      timestamp: new Date().toISOString(),
      ...data,
    };

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        redirect: "follow",
        // text/plain avoids CORS preflight on Apps Script web apps
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
  });
