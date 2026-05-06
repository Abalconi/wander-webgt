import puntaCana from "@/assets/punta-cana.jpg";
import cancun from "@/assets/cancun.jpg";
import curazao from "@/assets/curazao.jpg";
import aruba from "@/assets/aruba.jpg";
import rio from "@/assets/rio.jpg";
import cartagena from "@/assets/cartagena.jpg";

export type Destination = {
  slug: string;
  name: string;
  seoTitle: string;
  tagline: string;
  image: string;
  description: string;
  highlights: string[];
};

export const destinations: Destination[] = [
  {
    slug: "punta-cana",
    name: "Punta Cana",
    seoTitle: "Paquetes a Punta Cana Todo Incluido",
    tagline: "Resorts 5★ con playas de arena blanca",
    image: puntaCana,
    description:
      "Punta Cana es el destino caribeño por excelencia: playas interminables, resorts de lujo todo incluido y un mar turquesa inigualable.",
    highlights: ["Bávaro Beach", "Hoyo Azul", "Isla Saona", "Resorts 5★"],
  },
  {
    slug: "cancun",
    name: "Cancún",
    seoTitle: "Paquetes a Cancún Todo Incluido",
    tagline: "Riviera Maya, cenotes y vida nocturna",
    image: cancun,
    description:
      "Disfruta del Caribe mexicano con paquetes todo incluido en hoteles de la Zona Hotelera, excursiones a Tulum, Chichén Itzá y los mejores cenotes.",
    highlights: ["Zona Hotelera", "Chichén Itzá", "Tulum", "Cenotes"],
  },
  {
    slug: "curazao",
    name: "Curazao",
    seoTitle: "Paquetes a Curazao Todo Incluido",
    tagline: "Willemstad colonial y playas escondidas",
    image: curazao,
    description:
      "Una joya del Caribe Holandés. Arquitectura colonial, playas privadas y aguas cristalinas perfectas para el snorkel.",
    highlights: ["Willemstad", "Playa Kenepa", "Snorkel", "Tour por la isla"],
  },
  {
    slug: "aruba",
    name: "Aruba",
    seoTitle: "Paquetes a Aruba Todo Incluido",
    tagline: "One Happy Island bajo el sol",
    image: aruba,
    description:
      "Sol todo el año, Eagle Beach entre las mejores del mundo y resorts de clase mundial frente al mar.",
    highlights: ["Eagle Beach", "Oranjestad", "Parque Arikok", "Catamarán"],
  },
  {
    slug: "rio-de-janeiro",
    name: "Río de Janeiro",
    seoTitle: "Paquetes a Río de Janeiro Todo Incluido",
    tagline: "Cristo Redentor, samba y Copacabana",
    image: rio,
    description:
      "La ciudad maravillosa te espera con playas icónicas, montañas espectaculares y la energía vibrante de la cultura brasileña.",
    highlights: ["Cristo Redentor", "Copacabana", "Pan de Azúcar", "Ipanema"],
  },
  {
    slug: "cartagena",
    name: "Cartagena",
    seoTitle: "Paquetes a Cartagena Todo Incluido",
    tagline: "La heroica amurallada del Caribe",
    image: cartagena,
    description:
      "Calles coloniales, balcones floreados, gastronomía caribeña y noches inolvidables en la ciudad amurallada.",
    highlights: ["Ciudad Amurallada", "Islas del Rosario", "Getsemaní", "Castillo San Felipe"],
  },
];

export const getDestination = (slug: string) =>
  destinations.find((d) => d.slug === slug);

export const WHATSAPP_URL = "https://wa.me/tu_numero";
