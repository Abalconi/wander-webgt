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
  // Search-specific
  departureDate: z.string().max(30).optional().default(""),
  returnDate: z.string().max(30).optional().default(""),
  travelers: z.string().max(500).optional().default(""),
});

export const saveLeadToSheet = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => LeadSchema.parse(data))
  .handler(async ({ data }) => {
    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
    const SHEET_ID = process.env.GOOGLE_SHEETS_LEADS_ID;

    if (!LOVABLE_API_KEY || !GOOGLE_SHEETS_API_KEY || !SHEET_ID) {
      console.error("Missing env for Google Sheets lead capture");
      return { ok: false, error: "config" };
    }

    const timestamp = new Date().toISOString();
    const row = [
      timestamp,
      data.type,
      data.destination,
      data.firstName,
      data.lastName,
      data.email,
      data.whatsapp,
      data.delivery,
      data.language,
      data.departureDate,
      data.returnDate,
      data.travelers,
    ];

    const url = `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SHEET_ID}/values/Leads!A1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": GOOGLE_SHEETS_API_KEY,
        },
        body: JSON.stringify({ values: [row] }),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error(`Sheets append failed [${res.status}]: ${body}`);
        return { ok: false, error: `sheets_${res.status}` };
      }
      return { ok: true };
    } catch (err) {
      console.error("Sheets append exception:", err);
      return { ok: false, error: "exception" };
    }
  });
