## Objetivo
Reemplazar la integración actual (conector de Google Sheets) por una llamada directa a tu Apps Script Web App, que ya maneja `doPost` y escribe en la hoja.

## Pasos

1. **Agregar secreto** `GOOGLE_SHEETS_WEBHOOK_URL` con el valor:
   `https://script.google.com/macros/s/AKfycbxdmMrLE9NfWU0w8Xg2kwsGdMf_5OhEByYrm6VpBONLqcxQmr8yvTnoiPoTH9TlgzKU/exec`

2. **Reescribir `src/lib/leads.functions.ts`**:
   - Eliminar la lógica del connector gateway (`LOVABLE_API_KEY`, `GOOGLE_SHEETS_API_KEY`, `GOOGLE_SHEETS_LEADS_ID`).
   - Hacer un `fetch` POST directo a `process.env.GOOGLE_SHEETS_WEBHOOK_URL` con el JSON de los datos del lead (mismos campos que ya envía: `type`, `destination`, `firstName`, `lastName`, `email`, `whatsapp`, `delivery`, `language`, `departureDate`, `returnDate`, `travelers`).
   - Mantener la validación con Zod intacta para que el frontend siga funcionando sin cambios.
   - Usar `redirect: "follow"` y `Content-Type: text/plain` para evitar el preflight CORS de Apps Script (truco estándar para webhooks de Google Apps Script).

3. **No tocar** `ItineraryDialog.tsx` ni `index.tsx` — siguen llamando `saveLeadToSheet` con la misma forma.

## Tareas pendientes para ti (Alessandra)

- Actualizar el script en el editor de Apps Script con la versión que soporta los 12 campos (te la pasé en el mensaje anterior).
- Volver a desplegar (**Implementar → Administrar implementaciones → Editar → Nueva versión**) para que los cambios queden activos en la misma URL `/exec`.
- Confirmar que el acceso del despliegue sea **"Cualquier usuario"** (incluso anónimo).

## Verificación
Tras implementar, haré una búsqueda de prueba desde el sitio y confirmaremos que aparece una fila nueva en la pestaña `Leads` de tu hoja.
