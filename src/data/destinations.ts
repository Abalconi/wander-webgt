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
  seoTitleEn: string;
  tagline: string;
  taglineEn: string;
  image: string;
  description: string;
  descriptionEn: string;
  highlights: string[];
  highlightsEn: string[];
  fromPrice: number;
  nights: number;
  attractions: string[];
  includes: string[];
  includesEn: string[];
  pdfUrl: string;
};

export const destinations: Destination[] = [
  {
    slug: "punta-cana",
    name: "Punta Cana",
    seoTitle: "Paquetes a Punta Cana Todo Incluido",
    seoTitleEn: "All-Inclusive Punta Cana Packages",
    tagline: "Resorts 5★ con playas de arena blanca",
    taglineEn: "5★ resorts with white-sand beaches",
    image: puntaCana,
    description:
      "Punta Cana es el destino caribeño por excelencia: playas interminables, resorts todo incluido y un mar turquesa inigualable.",
    descriptionEn:
      "Punta Cana is the Caribbean destination par excellence: endless beaches, all-inclusive resorts and incomparable turquoise waters.",
    highlights: ["Bávaro Beach", "Hoyo Azul", "Isla Saona", "Resorts 5★"],
    highlightsEn: ["Bávaro Beach", "Hoyo Azul", "Saona Island", "5★ Resorts"],
    fromPrice: 1299,
    nights: 6,
    attractions: ["Bávaro Beach", "Hoyo Azul", "Isla Saona", "Cap Cana", "Macao Beach"],
    includes: ["Vuelos directos", "Hotel Resort Todo Incluido", "Traslados aeropuerto-hotel", "Seguro de viaje"],
    includesEn: ["Direct flights", "All-Inclusive Resort", "Airport-hotel transfers", "Travel insurance"],
    pdfUrl: "/itinerarios/punta-cana.pdf",
  },
  {
    slug: "cancun",
    name: "Cancún",
    seoTitle: "Paquetes a Cancún Todo Incluido",
    seoTitleEn: "All-Inclusive Cancún Packages",
    tagline: "Riviera Maya, cenotes y vida nocturna",
    taglineEn: "Riviera Maya, cenotes and nightlife",
    image: cancun,
    description:
      "Cancún combina la belleza natural del Caribe mexicano con la rica historia maya. Explora cenotes cristalinos, visita las impresionantes ruinas de Chichén Itzá y relájate en playas de ensueño. Nuestros paquetes incluyen los mejores hoteles de la Zona Hotelera.",
    descriptionEn:
      "Cancún combines the natural beauty of the Mexican Caribbean with rich Mayan history. Explore crystal-clear cenotes, visit Chichén Itzá and relax on dreamy beaches. Our packages include the best hotels in the Hotel Zone.",
    highlights: ["Zona Hotelera", "Chichén Itzá", "Tulum", "Cenotes"],
    highlightsEn: ["Hotel Zone", "Chichén Itzá", "Tulum", "Cenotes"],
    fromPrice: 1099,
    nights: 5,
    attractions: ["Chichén Itzá", "Xcaret", "Xel-Há", "Isla Mujeres", "Playa del Carmen", "Tulum"],
    includes: ["Vuelos directos", "Hotel Resort Todo Incluido", "Traslados aeropuerto-hotel", "Seguro de viaje"],
    includesEn: ["Direct flights", "All-Inclusive Resort", "Airport-hotel transfers", "Travel insurance"],
    pdfUrl: "/itinerarios/cancun.pdf",
  },
  {
    slug: "curazao",
    name: "Curazao",
    seoTitle: "Paquetes a Curazao Todo Incluido",
    seoTitleEn: "All-Inclusive Curaçao Packages",
    tagline: "Willemstad colonial y playas escondidas",
    taglineEn: "Colonial Willemstad and hidden beaches",
    image: curazao,
    description:
      "Una joya del Caribe Holandés. Arquitectura colonial, playas privadas y aguas cristalinas perfectas para el snorkel.",
    descriptionEn:
      "A jewel of the Dutch Caribbean. Colonial architecture, private beaches and crystal-clear waters perfect for snorkeling.",
    highlights: ["Willemstad", "Playa Kenepa", "Snorkel", "Tour por la isla"],
    highlightsEn: ["Willemstad", "Kenepa Beach", "Snorkeling", "Island tour"],
    fromPrice: 1499,
    nights: 6,
    attractions: ["Willemstad", "Playa Kenepa", "Klein Curaçao", "Mambo Beach", "Cuevas de Hato"],
    includes: ["Vuelos directos", "Hotel Resort Todo Incluido", "Traslados aeropuerto-hotel", "Seguro de viaje"],
    includesEn: ["Direct flights", "All-Inclusive Resort", "Airport-hotel transfers", "Travel insurance"],
    pdfUrl: "/itinerarios/curazao.pdf",
  },
  {
    slug: "aruba",
    name: "Aruba",
    seoTitle: "Paquetes a Aruba Todo Incluido",
    seoTitleEn: "All-Inclusive Aruba Packages",
    tagline: "One Happy Island bajo el sol",
    taglineEn: "One Happy Island under the sun",
    image: aruba,
    description:
      "Sol todo el año, Eagle Beach entre las mejores del mundo y resorts de clase mundial frente al mar.",
    descriptionEn:
      "Year-round sunshine, Eagle Beach among the world's best, and world-class oceanfront resorts.",
    highlights: ["Eagle Beach", "Oranjestad", "Parque Arikok", "Catamarán"],
    highlightsEn: ["Eagle Beach", "Oranjestad", "Arikok Park", "Catamaran"],
    fromPrice: 1399,
    nights: 5,
    attractions: ["Eagle Beach", "Oranjestad", "Parque Arikok", "Palm Beach", "Baby Beach"],
    includes: ["Vuelos directos", "Hotel Resort Todo Incluido", "Traslados aeropuerto-hotel", "Seguro de viaje"],
    includesEn: ["Direct flights", "All-Inclusive Resort", "Airport-hotel transfers", "Travel insurance"],
    pdfUrl: "/itinerarios/aruba.pdf",
  },
  {
    slug: "rio-de-janeiro",
    name: "Río de Janeiro",
    seoTitle: "Paquetes a Río de Janeiro",
    seoTitleEn: "Rio de Janeiro Packages",
    tagline: "Cristo Redentor, samba y Copacabana",
    taglineEn: "Christ the Redeemer, samba and Copacabana",
    image: rio,
    description:
      "La ciudad maravillosa te espera con playas icónicas, montañas espectaculares y la energía vibrante de la cultura brasileña.",
    descriptionEn:
      "The marvelous city awaits with iconic beaches, spectacular mountains and the vibrant energy of Brazilian culture.",
    highlights: ["Cristo Redentor", "Copacabana", "Pan de Azúcar", "Ipanema"],
    highlightsEn: ["Christ the Redeemer", "Copacabana", "Sugarloaf", "Ipanema"],
    fromPrice: 1599,
    nights: 7,
    attractions: ["Cristo Redentor", "Copacabana", "Pan de Azúcar", "Ipanema", "Maracaná"],
    includes: ["Vuelos directos", "Hotel céntrico", "Traslados aeropuerto-hotel", "Seguro de viaje"],
    includesEn: ["Direct flights", "Central hotel", "Airport-hotel transfers", "Travel insurance"],
    pdfUrl: "/itinerarios/rio-de-janeiro.pdf",
  },
  {
    slug: "cartagena",
    name: "Cartagena",
    seoTitle: "Paquetes a Cartagena Todo Incluido",
    seoTitleEn: "All-Inclusive Cartagena Packages",
    tagline: "La heroica amurallada del Caribe",
    taglineEn: "The walled heroine of the Caribbean",
    image: cartagena,
    description:
      "Calles coloniales, balcones floreados, gastronomía caribeña y noches inolvidables en la ciudad amurallada.",
    descriptionEn:
      "Colonial streets, flowered balconies, Caribbean gastronomy and unforgettable nights in the walled city.",
    highlights: ["Ciudad Amurallada", "Islas del Rosario", "Getsemaní", "Castillo San Felipe"],
    highlightsEn: ["Walled City", "Rosario Islands", "Getsemaní", "San Felipe Castle"],
    fromPrice: 899,
    nights: 4,
    attractions: ["Ciudad Amurallada", "Islas del Rosario", "Getsemaní", "Castillo San Felipe", "Playa Blanca"],
    includes: ["Vuelos directos", "Hotel Boutique", "Traslados aeropuerto-hotel", "Seguro de viaje"],
    includesEn: ["Direct flights", "Boutique hotel", "Airport-hotel transfers", "Travel insurance"],
    pdfUrl: "/itinerarios/cartagena.pdf",
  },
];

export const getDestination = (slug: string) =>
  destinations.find((d) => d.slug === slug);

export const WHATSAPP_NUMBER = "39616185";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const COMPANY_EMAIL = "reservas@wandergt.com";
