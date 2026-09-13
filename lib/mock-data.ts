// --- MOCK DATA LAYER ---
// This file stands in for Firestore collections until the real integration
// is wired up. Each section below marks exactly what it replaces:
//
//   properties -> collection(db, 'properties')
//   contacts   -> collection(db, 'contacts')
//   adminUsers -> collection(db, 'users')

export type PropertyStatus = "Publicada" | "Borrador";
export type ListingType = "Venta" | "Alquiler";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  listingType: ListingType;
  beds: number;
  baths: number;
  sqm: string;
  image: string;
  images: string[];
  editorialStory: string[];
  status: PropertyStatus;
}

export type ContactStatus = "Nuevo" | "Contactado" | "Cerrado";

export interface Contact {
  id: string;
  name: string;
  email: string;
  property: string;
  message: string;
  date: string;
  status: ContactStatus;
}

export type AdminRole = "Administrador" | "Editor";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
}

// TODO(Firebase): replace with a getDocs(collection(db, 'properties')) read
// on mount, plus onSnapshot for live updates.
export const initialProperties: Property[] = [
  {
    id: "1",
    title: "Villa Horizonte",
    location: "José Ignacio, UY",
    price: "US$14.500.000",
    listingType: "Venta",
    beds: 5,
    baths: 6,
    sqm: "576",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop",
    ],
    editorialStory: [
      "Asentada sobre las dunas de José Ignacio, Villa Horizonte es un ejercicio de contención arquitectónica: cada decisión espacial busca disolver el límite entre el interior habitado y la costa atlántica sin domesticar. Los volúmenes de madera y hormigón se recortan contra el cielo del atardecer como una silueta más del paisaje.",
      "Los ventanales de piso a techo enmarcan un horizonte ininterrumpido, mientras que los materiales — madera reciclada, piedra local, acero patinado — envejecen junto con el entorno en lugar de resistirlo. Es una casa pensada para quienes entienden que el verdadero lujo, en esta costa, es el silencio.",
    ],
    status: "Publicada",
  },
  {
    id: "2",
    title: "Santuario del Acantilado",
    location: "Manantiales, UY",
    price: "US$9.800.000",
    listingType: "Venta",
    beds: 4,
    baths: 4.5,
    sqm: "418",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    ],
    editorialStory: [
      "Suspendida sobre la línea donde las olas de Manantiales rompen contra la barranca, esta residencia responde al oleaje constante con una calma deliberada. La estructura, elevada sobre pilotes de hormigón visto, deja que el viento y la vegetación nativa circulen por debajo sin interrupciones.",
      "Adentro, una paleta de materiales fríos — cemento alisado, vidrio, metal negro — contrasta con la calidez de la luz que entra desde el amanecer hasta el atardecer. Es un refugio pensado para quienes buscan estar cerca del mar sin ceder terreno al ruido de la temporada alta.",
    ],
    status: "Publicada",
  },
  {
    id: "3",
    title: "Pabellón de Cristal",
    location: "La Barra, UY",
    price: "US$11.200.000",
    listingType: "Venta",
    beds: 3,
    baths: 3.5,
    sqm: "362",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
    ],
    editorialStory: [
      "A pasos del puente que define a La Barra, el Pabellón de Cristal lleva la lógica del diseño arquitectónico de la zona a su expresión más pura: superficies acristaladas, líneas rectas y una estructura que parece flotar sobre el paisaje sin imponerse sobre él.",
      "De noche, la casa se convierte en una linterna entre los pinares; de día, se retira detrás de los reflejos del cielo y el monte. Fue concebida para quienes valoran el diseño tanto como la ubicación — una pieza tan interesante desde adentro como desde la ruta.",
    ],
    status: "Publicada",
  },
  {
    id: "4",
    title: "Residencia Océano Azul",
    location: "Punta del Este, UY",
    price: "US$18.500.000",
    listingType: "Venta",
    beds: 6,
    baths: 7,
    sqm: "752",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
    ],
    editorialStory: [
      "En el corazón de Punta del Este, la Residencia Océano Azul reinterpreta el lujo balneario clásico con una escala contemporánea: siete ambientes distribuidos alrededor de una piscina a nivel del horizonte, y una fachada que capta la última luz del día desde cada habitación principal.",
      "Es una casa construida para recibir — con espacios de estar que se despliegan hacia el exterior y una cocina pensada para las cenas largas de enero. Su ubicación, a minutos de la Rambla, la vuelve tan práctica como espectacular.",
    ],
    status: "Publicada",
  },
  {
    id: "5",
    title: "Casa de las Dunas",
    location: "José Ignacio, UY",
    price: "US$7.400.000",
    listingType: "Venta",
    beds: 3,
    baths: 3,
    sqm: "297",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop",
    ],
    editorialStory: [
      "Moldeada por los vientos que barren las dunas de José Ignacio, esta casa minimalista reduce el programa a lo esencial: tres dormitorios, líneas bajas y una orientación estudiada para resguardarse del viento sur sin perder la vista al mar.",
      "Los materiales — madera clara, cal, piedra — envejecen con el sol y la sal como parte del diseño, no a pesar de él. Una propuesta honesta para quienes buscan una segunda residencia sin ostentación, pero sin concesiones en el detalle.",
    ],
    status: "Borrador",
  },
  {
    id: "6",
    title: "Horizonte Atlántico",
    location: "La Barra, UY",
    price: "US$12.900.000",
    listingType: "Venta",
    beds: 4,
    baths: 5,
    sqm: "474",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
    ],
    editorialStory: [
      "Horizonte Atlántico ocupa un terreno elevado de La Barra, con una piscina infinita que parece continuarse en el propio océano. Su planta se organiza en dos niveles conectados por una escalera de piedra que actúa casi como una escultura central de la casa.",
      "Diseñada para las estadías largas, la casa privilegia los espacios de transición — galerías, terrazas, deck — por sobre los ambientes cerrados, apostando a que la vida transcurra, sobre todo, afuera.",
    ],
    status: "Publicada",
  },
];

// TODO(Firebase): replace with a getDocs(collection(db, 'contacts')) read
// on mount, plus onSnapshot for live updates as new inquiries arrive from
// the public contact form (addDoc on submit).
export const initialContacts: Contact[] = [
  {
    id: "c1",
    name: "Martín Rodríguez",
    email: "martin@rodriguez.com",
    property: "Villa Horizonte, José Ignacio",
    message: "Interesado en coordinar una visita la última semana de enero.",
    date: "2026-09-10",
    status: "Nuevo",
  },
  {
    id: "c2",
    name: "Valentina Souza",
    email: "valentina.souza@example.com",
    property: "Residencia Océano Azul, Punta del Este",
    message: "¿Está disponible para alquiler temporal fuera de temporada?",
    date: "2026-09-09",
    status: "Contactado",
  },
  {
    id: "c3",
    name: "Lucas Ferreira",
    email: "lucas.ferreira@example.com",
    property: "Pabellón de Cristal, La Barra",
    message: "Quisiera información sobre financiación y gastos de cierre.",
    date: "2026-09-07",
    status: "Nuevo",
  },
  {
    id: "c4",
    name: "Sofía Bentancourt",
    email: "sofia.bentancourt@example.com",
    property: "Representación General",
    message: "Estoy buscando listar una propiedad en Manantiales.",
    date: "2026-09-05",
    status: "Cerrado",
  },
  {
    id: "c5",
    name: "Ignacio Pérez",
    email: "ignacio.perez@example.com",
    property: "Santuario del Acantilado, Manantiales",
    message: "Consulta sobre metraje exacto del terreno.",
    date: "2026-09-02",
    status: "Contactado",
  },
];

// TODO(Firebase): replace with a getDocs(collection(db, 'users')) read,
// scoped to admins only via security rules.
export const initialAdminUsers: AdminUser[] = [
  { id: "u1", name: "Camila Estévez", email: "camila@coastalweb.com.uy", role: "Administrador" },
  { id: "u2", name: "Diego Larrañaga", email: "diego@coastalweb.com.uy", role: "Editor" },
  { id: "u3", name: "Florencia Núñez", email: "florencia@coastalweb.com.uy", role: "Editor" },
];
