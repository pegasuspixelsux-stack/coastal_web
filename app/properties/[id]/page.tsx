import type { Metadata } from 'next';
import { Fraunces } from 'next/font/google';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Bath, Bed, Mail, MapPin, Maximize, MessageCircle } from 'lucide-react';
import { initialProperties } from '@/lib/mock-data';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

const WHATSAPP_NUMBER = '59842440199'; // +598 4244 0199, matching the public contact info

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return initialProperties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const property = initialProperties.find((p) => p.id === id);
  if (!property) return {};

  return {
    title: `${property.title} | Coastal Web`,
    description: property.editorialStory[0]?.slice(0, 160),
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { id } = await params;
  const property = initialProperties.find((p) => p.id === id);

  if (!property) notFound();

  const related = initialProperties.filter((p) => p.id !== property.id).slice(0, 3);
  const galleryImages = property.images.filter((img) => img !== property.image).slice(0, 2);

  const whatsappMessage = encodeURIComponent(
    `Hola, me interesa la propiedad ${property.title} en ${property.location}.`
  );
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;
  const mailtoLink = `mailto:concierge@coastalweb.com.uy?subject=${encodeURIComponent(
    `Consulta: ${property.title}`
  )}&body=${encodeURIComponent(`Hola, me interesa la propiedad ${property.title} en ${property.location}.`)}`;

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans antialiased">
      {/* --- NAVIGATION --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FBFBFD]/80 backdrop-blur-md border-b border-[#000000]/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg tracking-tight">
            Coastal.
          </Link>
          <Link
            href="/#properties"
            className="inline-flex items-center space-x-2 text-sm text-[#515154] hover:text-[#1D1D1F] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Propiedades</span>
          </Link>
        </div>
      </header>

      {/* --- EDITORIAL HERO --- */}
      <section className="relative w-full h-[70vh] mt-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${property.image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-16 text-white">
          <div className="flex items-center space-x-2 text-white/80 text-sm font-medium tracking-wide uppercase mb-4">
            <MapPin className="w-4 h-4" />
            <span>{property.location}</span>
          </div>
          <h1 className={`${fraunces.className} italic text-5xl md:text-7xl tracking-tight max-w-3xl`}>
            {property.title}
          </h1>
        </div>
      </section>

      {/* --- EDITORIAL BODY --- */}
      <main className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Article column */}
        <article className="lg:col-span-2 space-y-8">
          {property.editorialStory.length > 0 && (
            <p className={`${fraunces.className} italic text-2xl md:text-3xl leading-snug text-[#1D1D1F]`}>
              {property.editorialStory[0]}
            </p>
          )}

          {property.editorialStory.slice(1).map((paragraph, i) => (
            <p key={i} className="text-[#515154] font-light leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}

          {galleryImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4 pt-6">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] bg-cover bg-center"
                  style={{ backgroundImage: `url(${img})` }}
                />
              ))}
            </div>
          )}
        </article>

        {/* Fact box */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white border border-[#000000]/10 p-8">
            <p className="text-xs uppercase tracking-widest text-[#515154] font-semibold mb-2">Precio</p>
            <p className="text-3xl font-semibold tracking-tight font-mono mb-6">{property.price}</p>

            <div className="grid grid-cols-3 gap-4 pb-6 border-b border-[#000000]/10 text-center">
              <div>
                <Bed className="w-4 h-4 mx-auto mb-1.5 text-[#86868B]" />
                <p className="text-sm font-semibold">{property.beds}</p>
                <p className="text-[10px] uppercase tracking-wider text-[#86868B]">Dorm.</p>
              </div>
              <div>
                <Bath className="w-4 h-4 mx-auto mb-1.5 text-[#86868B]" />
                <p className="text-sm font-semibold">{property.baths}</p>
                <p className="text-[10px] uppercase tracking-wider text-[#86868B]">Baños</p>
              </div>
              <div>
                <Maximize className="w-4 h-4 mx-auto mb-1.5 text-[#86868B]" />
                <p className="text-sm font-semibold">{property.sqm}</p>
                <p className="text-[10px] uppercase tracking-wider text-[#86868B]">m²</p>
              </div>
            </div>

            <div className="pt-6 space-y-3">
              <a
                href={mailtoLink}
                className="w-full inline-flex items-center justify-center space-x-2 bg-[#1D1D1F] text-white px-6 py-3.5 text-sm font-medium hover:bg-[#333336] transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Consultar por Email</span>
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 bg-[#25D366] text-white px-6 py-3.5 text-sm font-medium hover:bg-[#22bf5b] transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chatear por WhatsApp</span>
              </a>
            </div>
          </div>
        </aside>
      </main>

      {/* --- RELATED PROPERTIES --- */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <h2 className="text-xs uppercase tracking-widest text-[#515154] font-semibold mb-8">
            Más Propiedades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((r) => (
              <Link key={r.id} href={`/properties/${r.id}`} className="group block">
                <div
                  className="aspect-[4/3] bg-cover bg-center mb-3 transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ backgroundImage: `url(${r.image})` }}
                />
                <p className="text-xs text-[#86868B] uppercase tracking-wide mb-1">{r.location}</p>
                <p className="font-medium group-hover:underline underline-offset-2">{r.title}</p>
                <p className="text-sm font-mono text-[#515154] mt-1">{r.price}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* --- MINIMAL FOOTER --- */}
      <footer className="bg-[#1D1D1F] text-white/50 py-10 px-6 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Coastal Web Estate Inc. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
