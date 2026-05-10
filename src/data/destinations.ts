import puntaCana from "@/assets/punta-cana.jpg";
import cancun from "@/assets/cancun.jpg";
import curazao from "@/assets/curazao.jpg";
import aruba from "@/assets/aruba.jpg";
import rio from "@/assets/rio.jpg";
import cartagena from "@/assets/cartagena.jpg";
import mexico from "@/assets/mexico.png";
import mucura from "@/assets/mucura.png";

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
  boarding: "all-inclusive" | "breakfast" | "room_only";
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
      "Disfruta Punta Cana sin límites. Tu paquete incluye absolutamente todo: desayunos, almuerzos y cenas gourmet, snacks constantes y barra libre de bebidas con y sin alcohol. Olvídate de la billetera y concéntrate solo en el mar turquesa.",
    descriptionEn:
      "Enjoy Punta Cana without limits. Your package includes absolutely everything: gourmet breakfast, lunch, and dinner, constant snacks, and an open bar with alcoholic and non-alcoholic drinks. Forget your wallet and just focus on the turquoise sea.",
    highlights: ["Playa Bávaro", "Hoyo Azul", "Isla Saona", "Resorts 5★"],
    highlightsEn: ["Bávaro Beach", "Hoyo Azul", "Saona Island", "5★ Resorts"],
    fromPrice: 9499,
    nights: 4,
    attractions: ["Bávaro Beach", "Hoyo Azul", "Isla Saona", "Cap Cana", "Macao Beach"],
    includes: ["Vuelos directos", "Hotel Resort Todo Incluido", "Traslados aeropuerto-hotel", "Seguro de viaje"],
    includesEn: ["Direct flights", "All-Inclusive Resort", "Airport-hotel transfers", "Travel insurance"],
    pdfUrl: "/itinerarios/punta-cana.pdf",
    boarding: "all-inclusive",
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
      "El paraíso a tu alcance. Vive un resort con todo ilimitado (comidas y bar abierto) más una aventura inolvidable en el parque Xcaret. ¡Diversión sin cargos extra!",
    descriptionEn:
      "Paradise within your reach. Experience a resort with unlimited everything (meals and open bar) plus an unforgettable adventure at Xcaret Park. Fun without extra charges!",
    highlights: ["Zona Hotelera", "Chichén Itzá", "Tulum", "Cenotes"],
    highlightsEn: ["Hotel Zone", "Chichén Itzá", "Tulum", "Cenotes"],
    fromPrice: 9699,
    nights: 3,
    attractions: ["Chichén Itzá", "Xcaret", "Xel-Há", "Isla Mujeres", "Playa del Carmen", "Tulum"],
    includes: ["Vuelos directos", "Hotel Resort Todo Incluido", "Traslados aeropuerto-hotel", "Seguro de viaje"],
    includesEn: ["Direct flights", "All-Inclusive Resort", "Airport-hotel transfers", "Travel insurance"],
    pdfUrl: "/itinerarios/cancun.pdf",
    boarding: "all-inclusive",
  },
  {
    slug: "curazao",
    name: "Curazao",
    seoTitle: "Paquetes a Curazao con Desayunos",
    seoTitleEn: "Curaçao Packages with Breakfast",
    tagline: "Willemstad colonial y playas escondidas",
    taglineEn: "Colonial Willemstad and hidden beaches",
    image: curazao,
    description:
      "Color, cultura y mar turquesa. Disfruta de alojamiento con desayunos diarios, ideal para quienes buscan libertad total para descubrir cada rincón de esta joya caribeña.",
    descriptionEn:
      "Color, culture, and turquoise sea. Enjoy accommodation with daily breakfast, ideal for those seeking total freedom to discover every corner of this Caribbean gem.",
    highlights: ["Willemstad", "Playa Kenepa", "Snorkel", "Tour por la isla"],
    highlightsEn: ["Willemstad", "Kenepa Beach", "Snorkeling", "Island tour"],
    fromPrice: 11199,
    nights: 4,
    attractions: ["Willemstad", "Playa Kenepa", "Klein Curaçao", "Mambo Beach", "Cuevas de Hato"],
    includes: ["Vuelos directos", "Hotel Resort Todo Incluido", "Traslados aeropuerto-hotel", "Seguro de viaje"],
    includesEn: ["Direct flights", "All-Inclusive Resort", "Airport-hotel transfers", "Travel insurance"],
    pdfUrl: "/itinerarios/curazao.pdf",
    boarding: "breakfast",
  },
  {
    slug: "aruba",
    name: "Aruba",
    seoTitle: "Paquetes a Aruba con Desayunos",
    seoTitleEn: "Aruba Packages with Breakfast",
    tagline: "One Happy Island bajo el sol",
    taglineEn: "One Happy Island under the sun",
    image: aruba,
    description:
      "Tu refugio en la \"Isla Feliz\". Asegura tu descanso en hoteles seleccionados con desayunos incluidos. La base perfecta para explorar las mejores playas del mundo a tu ritmo.",
    descriptionEn:
      "Your refuge on the 'Happy Island'. Secure your rest in selected hotels with breakfast included. The perfect base to explore the world's best beaches at your own pace.",
    highlights: ["Eagle Beach", "Oranjestad", "Parque Arikok", "Catamarán"],
    highlightsEn: ["Eagle Beach", "Oranjestad", "Arikok Park", "Catamaran"],
    fromPrice: 9299,
    nights: 4,
    attractions: ["Eagle Beach", "Oranjestad", "Parque Arikok", "Palm Beach", "Baby Beach"],
    includes: ["Vuelos directos", "Hotel Resort Todo Incluido", "Traslados aeropuerto-hotel", "Seguro de viaje"],
    includesEn: ["Direct flights", "All-Inclusive Resort", "Airport-hotel transfers", "Travel insurance"],
    pdfUrl: "/itinerarios/aruba.pdf",
    boarding: "breakfast",
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
      "Lo mejor de Río en un solo paquete. Hospédate en la icónica Copacabana con desayunos incluidos y un tour completo al Cristo Redentor, Pan de Azúcar y Selarón. La ciudad a tus pies.",
    descriptionEn:
      "The best of Rio in a single package. Stay at the iconic Copacabana with breakfast included and a full tour to Christ the Redeemer, Sugarloaf, and Selarón. The city at your feet.",
    highlights: ["Cristo Redentor", "Copacabana", "Pan de Azúcar", "Ipanema"],
    highlightsEn: ["Christ the Redeemer", "Copacabana", "Sugarloaf", "Ipanema"],
    fromPrice: 12999,
    nights: 5,
    attractions: ["Cristo Redentor", "Copacabana", "Pan de Azúcar", "Ipanema", "Maracaná"],
    includes: ["Vuelos directos", "Hotel céntrico", "Traslados aeropuerto-hotel", "Seguro de viaje"],
    includesEn: ["Direct flights", "Central hotel", "Airport-hotel transfers", "Travel insurance"],
    pdfUrl: "/itinerarios/rio-de-janeiro.pdf",
    boarding: "breakfast",
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
      "¡Todo incluido y diversión total! Disfruta de comidas, bebidas ilimitadas y una escapada exclusiva a Bora Bora Beach Club. Tu única tarea es relajarte frente al Caribe.",
    descriptionEn:
      "All-inclusive and total fun! Enjoy meals, unlimited drinks, and an exclusive escape to Bora Bora Beach Club. Your only task is to relax in front of the Caribbean.",
    highlights: ["Ciudad Amurallada", "Islas del Rosario", "Getsemaní", "Castillo San Felipe"],
    highlightsEn: ["Walled City", "Rosario Islands", "Getsemaní", "San Felipe Castle"],
    fromPrice: 6399,
    nights: 3,
    attractions: ["Ciudad Amurallada", "Islas del Rosario", "Getsemaní", "Castillo San Felipe", "Playa Blanca"],
    includes: ["Vuelos directos", "Hotel Boutique", "Traslados aeropuerto-hotel", "Seguro de viaje"],
    includesEn: ["Direct flights", "Boutique hotel", "Airport-hotel transfers", "Travel insurance"],
    pdfUrl: "/itinerarios/cartagena.pdf",
    boarding: "all-inclusive",
  },
  {
    slug: "mexico-basilica",
    name: "México (Basílica)",
    seoTitle: "Peregrinación a la Basílica de Guadalupe",
    seoTitleEn: "Pilgrimage to the Basilica of Guadalupe",
    tagline: "Fe y devoción a solo 3 cuadras",
    taglineEn: "Faith and devotion just 3 blocks away",
    image: mexico,
    description:
      "Una experiencia de fe inigualable. Hospédate a solo 3 cuadras de la Basílica de Guadalupe. Incluye un tour guiado completo por la Basílica Antigua, la Nueva y el emblemático Cerro del Tepeyac. Ideal para quienes buscan cercanía y espiritualidad.",
    descriptionEn:
      "An incomparable experience of faith. Stay just 3 blocks from the Basilica of Guadalupe. Includes a full guided tour of the Old Basilica, the New Basilica, and the iconic Tepeyac Hill. Perfect for those seeking proximity and spirituality.",
    highlights: ["Basílica de Guadalupe", "Cerro del Tepeyac", "Tour Guiado", "Hotel Cercano"],
    highlightsEn: ["Basilica of Guadalupe", "Tepeyac Hill", "Guided Tour", "Close Hotel"],
    fromPrice: 5699,
    nights: 4,
    attractions: ["Basílica Antigua", "Basílica Nueva", "Capilla del Pocito", "Cerro del Tepeyac", "Museo de la Basílica"],
    includes: ["Vuelos directos", "Hotel a 3 cuadras de la Basílica", "Tour guiado especializado", "Traslados aeropuerto-hotel"],
    includesEn: ["Direct flights", "Hotel 3 blocks from Basilica", "Specialized guided tour", "Airport-hotel transfers"],
    pdfUrl: "/itinerarios/mexico-basilica.pdf",
    boarding: "room_only",
  },
  {
    slug: "isla-mucura",
    name: "Isla Múcura",
    seoTitle: "Paraíso en Isla Múcura y Cartagena",
    seoTitleEn: "Paradise in Isla Mucura and Cartagena",
    tagline: "Bungalows de lujo frente al mar",
    taglineEn: "Luxury beachfront bungalows",
    image: mucura,
    description:
      "El escape perfecto al Caribe colombiano. Disfruta de 2 noches en Cartagena con desayunos y 2 noches en Isla Múcura en un bungalow frente a la playa con piscina privada. En la isla, tendrás la libertad de elegir tu alimentación a la carta o plan todo incluido (sin bebidas) pagando directamente en el destino.",
    descriptionEn:
      "The perfect escape to the Colombian Caribbean. Enjoy 2 nights in Cartagena with breakfast and 2 nights on Isla Mucura in a beachfront bungalow with a private pool. On the island, you'll have the freedom to choose your meal plan (à la carte or all-inclusive without drinks) by paying directly at the destination.",
    highlights: ["Bungalow con Piscina", "Frente al Mar", "Isla Múcura", "Cartagena Histórica"],
    highlightsEn: ["Bungalow with Pool", "Beachfront", "Mucura Island", "Historic Cartagena"],
    fromPrice: 8399,
    nights: 4,
    attractions: ["Isla Múcura", "Cartagena Amurallada", "Playa privada", "Snorkel nocturno", "Tintipán"],
    includes: ["Vuelos", "2 noches en Cartagena + 2 en Isla Múcura", "Bungalow con piscina privada", "Traslados lancha y tierra"],
    includesEn: ["Flights", "2 nights in Cartagena + 2 in Isla Mucura", "Bungalow with private pool", "Boat and land transfers"],
    pdfUrl: "/itinerarios/isla-mucura.pdf",
    boarding: "breakfast",
  },
];

export const getDestination = (slug: string) =>
  destinations.find((d) => d.slug === slug);

export const WHATSAPP_NUMBER = "39616185";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const COMPANY_EMAIL = "reservas@wandergt.com";
