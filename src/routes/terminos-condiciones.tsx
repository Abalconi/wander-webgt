import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/lang";
import { Clock, FileText, XCircle, AlertCircle, UserCheck, CreditCard, Plane } from "lucide-react";

export const Route = createFileRoute("/terminos-condiciones")({
  head: () => ({
    meta: [
      { title: "Términos y Condiciones | Wanderlux" },
      { name: "description", content: "Consulta las políticas de reserva, reembolsos y responsabilidades para tu viaje con Wanderlux." },
    ],
  }),
  component: TerminosPage,
});

function TerminosPage() {
  const { t } = useLang();

  const summaryItems = [
    { 
      Icon: Clock, 
      title: t("Check-in", "Check-in"), 
      desc: t("Estar 3 horas antes en el aeropuerto.", "Be at the airport 3 hours before.") 
    },
    { 
      Icon: UserCheck, 
      title: t("Documentación", "Documentation"), 
      desc: t("Pasaporte con 6 meses de vigencia y visas.", "Passport with 6 months validity and visas.") 
    },
    { 
      Icon: XCircle, 
      title: t("Políticas", "Policies"), 
      desc: t("Servicios no reembolsables ni endosables.", "Non-refundable and non-endorsable services.") 
    }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <div className="mb-12 text-center">
        <h1 className="font-display text-3xl font-bold text-primary md:text-5xl">
          {t("Términos y Condiciones", "Terms and Conditions")}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {t(
            "Queremos que tu viaje sea impecable, por eso te recordamos revisar estos puntos clave antes de partir.",
            "We want your trip to be flawless, so we remind you to review these key points before you go."
          )}
        </p>
      </div>

      {/* Resumen Visual */}
      <div className="mb-16 grid gap-6 sm:grid-cols-3">
        {summaryItems.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
              <item.Icon className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-primary">{item.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Contenido Legal */}
      <div className="prose prose-slate max-w-none space-y-8 rounded-3xl border border-border bg-card p-8 shadow-luxe md:p-12">
        <section>
          <h2 className="flex items-center gap-2 font-display text-2xl font-bold text-primary">
            <AlertCircle className="h-6 w-6 text-gold" />
            {t("Información Importante para tu Viaje", "Important Information for Your Trip")}
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <ul className="space-y-4 list-none pl-0">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">1</span>
                <span>{t("Itinerario de vuelo, precio y disponibilidad sujeto cambio sin previo aviso.", "Flight itinerary, price and availability subject to change without prior notice.")}</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">2</span>
                <span className="font-bold text-primary italic">
                  {t("Hoteles y paquetes son NO endosables y NO reembolsables.", "Hotels and packages are NON-endorsable and NON-refundable.")}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">3</span>
                <span>{t("Todo trámite migratorio, así como documentación necesaria para el viaje y arraigo, es responsabilidad del pasajero.", "All immigration procedures, as well as documentation necessary for travel and roots, are the responsibility of the passenger.")}</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">4</span>
                <span className="font-bold text-primary underline decoration-gold decoration-2 underline-offset-4 uppercase">
                  {t("PASAPORTE DEL CLIENTE DEBE CONTAR CON 6 MESES DE VIGENCIA PARA SU VIAJE.", "CLIENT'S PASSPORT MUST BE VALID FOR 6 MONTHS FOR THE TRIP.")}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">5</span>
                <span>{t("Por favor revisar que los nombres que aparecen en la reserva estén escritos igual que en los pasaportes.", "Please check that the names appearing on the reservation are spelled exactly as they appear in the passports.")}</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">6</span>
                <span>{t("Para confirmación de Crucero, se solicitan los datos de los pasajeros. Núm. de teléfono y correo electrónico. Obligatorio.", "For cruise confirmation, passenger data is requested. Phone number and email address. Mandatory.")}</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">7</span>
                <span>{t("Para viajar a Estados Unidos, Canadá y México se necesita VISA de cada país.", "To travel to the United States, Canada and Mexico, a VISA for each country is required.")}</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">8</span>
                <span>
                  <strong className="text-primary">{t("IMPORTANTE:", "IMPORTANT:")}</strong> {t("algunos hoteles de América y Europa cobran RESORT FEE entre 10 USD hasta 50 USD aproximante + impuestos. Por habitación, por noche (pagado en destino).", "some hotels in America and Europe charge a RESORT FEE between 10 USD and 50 USD approximately + taxes. Per room, per night (paid at destination).")}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">9</span>
                <span>{t("Menores que viajan con uno de sus padres o sin ninguno de sus padres, la persona acompañante debe presentar carta de permiso firmada y autenticada por un abogado.", "Minors traveling with one of their parents or without either of their parents, the accompanying person must present a letter of permission signed and authenticated by a lawyer.")}</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">10</span>
                <span>
                  <strong className="text-primary">{t("Verifique si no tiene arraigo,", "Check if you have any roots issues,")}</strong> {t("una vez pagados los servicios no son reembolsables.", "once the services are paid they are non-refundable.")}
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">11</span>
                <span>{t("Pasajeros deben estar 3 horas antes del vuelo en el aeropuerto.", "Passengers must be at the airport 3 hours before the flight.")}</span>
              </li>
            </ul>
          </div>
        </section>
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          {t("Al realizar tu reserva con Wanderlux, confirmas la aceptación de estos términos.", "By making your reservation with Wanderlux, you confirm acceptance of these terms.")}
        </p>
      </div>
    </div>
  );
}
