// --- MOCK DATA LAYER ---
// This file stands in for Firestore collections until the real integration
// is wired up. Each section below marks exactly what it replaces:
//
//   properties -> collection(db, 'properties')
//   contacts   -> collection(db, 'contacts')
//   adminUsers -> collection(db, 'users')

export type PropertyStatus = "Publicada" | "Borrador";

export interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqm: string;
  image: string;
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
    price: "$14.500.000",
    beds: 5,
    baths: 6,
    sqm: "576",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    status: "Publicada",
  },
  {
    id: "2",
    title: "Santuario del Acantilado",
    location: "Manantiales, UY",
    price: "$9.800.000",
    beds: 4,
    baths: 4.5,
    sqm: "418",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    status: "Publicada",
  },
  {
    id: "3",
    title: "Pabellón de Cristal",
    location: "La Barra, UY",
    price: "$11.200.000",
    beds: 3,
    baths: 3.5,
    sqm: "362",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&auto=format&fit=crop",
    status: "Publicada",
  },
  {
    id: "4",
    title: "Residencia Océano Azul",
    location: "Punta del Este, UY",
    price: "$18.500.000",
    beds: 6,
    baths: 7,
    sqm: "752",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop",
    status: "Publicada",
  },
  {
    id: "5",
    title: "Casa de las Dunas",
    location: "José Ignacio, UY",
    price: "$7.400.000",
    beds: 3,
    baths: 3,
    sqm: "297",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    status: "Borrador",
  },
  {
    id: "6",
    title: "Horizonte Atlántico",
    location: "La Barra, UY",
    price: "$12.900.000",
    beds: 4,
    baths: 5,
    sqm: "474",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
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
