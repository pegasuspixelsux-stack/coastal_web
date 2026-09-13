'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Mail,
  Phone,
  Send,
  Key,
  ShieldCheck,
  Users,
} from 'lucide-react';

// --- SCROLL-REVEAL PRIMITIVES ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={shouldReduceMotion ? undefined : fadeInUp}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

function RevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={shouldReduceMotion ? undefined : staggerContainer}
    >
      {children}
    </motion.div>
  );
}

// --- HERO SLIDES DATA ---
const heroSlides = [
  {
    id: 1,
    title: "Villa Horizonte",
    location: "José Ignacio, Uruguay",
    tagline: "Privacidad absoluta con vistas infinitas al Atlántico.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Santuario del Acantilado",
    location: "Manantiales, Uruguay",
    tagline: "Suspendido entre el cielo y el mar.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Pabellón de Cristal",
    location: "La Barra, Uruguay",
    tagline: "Integración arquitectónica perfecta con la naturaleza.",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Residencia Océano Azul",
    location: "Punta del Este, Uruguay",
    tagline: "Lujo atemporal al borde del agua.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Casa de las Dunas",
    location: "José Ignacio, Uruguay",
    tagline: "Vida minimalista moldeada por los vientos de la costa.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
  },
];

// --- OUR SERVICES (Nosotros section) ---
const services = [
  {
    icon: Key,
    title: "Adquisición de Propiedades",
    description: "Acceso off-market a residencias de gran valor arquitectónico a lo largo de la costa atlántica.",
  },
  {
    icon: ShieldCheck,
    title: "Asesoría Privada",
    description: "Acompañamiento discreto y de punta a punta en tasación, negociación y cierre.",
  },
  {
    icon: Users,
    title: "Servicios de Concierge",
    description: "Soporte dedicado para mudanza, puesta en valor y administración continua de la propiedad.",
  },
];

// --- HARDCODED PROPERTIES (Bento Grid) ---
const properties = [
  {
    id: 1,
    title: "Villa Horizonte",
    location: "José Ignacio, UY",
    price: "$14.500.000",
    beds: 5,
    baths: 6,
    sqm: "576",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    span: "col-span-1 md:col-span-2 row-span-2", // Large feature card
  },
  {
    id: 2,
    title: "Santuario del Acantilado",
    location: "Manantiales, UY",
    price: "$9.800.000",
    beds: 4,
    baths: 4.5,
    sqm: "418",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    span: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: 3,
    title: "Pabellón de Cristal",
    location: "La Barra, UY",
    price: "$11.200.000",
    beds: 3,
    baths: 3.5,
    sqm: "362",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&auto=format&fit=crop",
    span: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: 4,
    title: "Residencia Océano Azul",
    location: "Punta del Este, UY",
    price: "$18.500.000",
    beds: 6,
    baths: 7,
    sqm: "752",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
    span: "col-span-1 md:col-span-2 md:col-start-2 row-span-2 md:row-start-3", // Large feature card, right-aligned on row 2
  },
  {
    id: 5,
    title: "Casa de las Dunas",
    location: "José Ignacio, UY",
    price: "$7.400.000",
    beds: 3,
    baths: 3,
    sqm: "297",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    span: "col-span-1 md:col-span-1 row-span-1 md:col-start-1 md:row-start-3",
  },
  {
    id: 6,
    title: "Horizonte Atlántico",
    location: "La Barra, UY",
    price: "$12.900.000",
    beds: 4,
    baths: 5,
    sqm: "474",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    span: "col-span-1 md:col-span-1 row-span-1 md:col-start-1 md:row-start-4",
  },
];

export default function CoastalWebHome() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slideshow every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] selection:bg-[#000000] selection:text-[#FFFFFF] font-sans antialiased">

      {/* --- NAVIGATION --- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FBFBFD]/80 backdrop-blur-md border-b border-[#000000]/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-semibold text-lg tracking-tight">Coastal.</span>
          <nav className="hidden md:flex items-center space-x-8 text-sm text-[#515154]">
            <a href="#properties" className="hover:text-[#1D1D1F] transition-colors">Propiedades</a>
            <a href="#vision" className="hover:text-[#1D1D1F] transition-colors">Nosotros</a>
            <a href="#contact" className="hover:text-[#1D1D1F] transition-colors">Contacto</a>
          </nav>
          <a
            href="#contact"
            className="bg-[#1D1D1F] text-[#FFFFFF] text-xs font-medium px-4 py-2 rounded-none hover:bg-[#333336] transition-all"
          >
            Tour Privado
          </a>
        </div>
      </header>

      {/* --- HERO SLIDESHOW (5-slide full-width) --- */}
      <section className="relative w-full h-screen overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
              index === currentSlide ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Background Image with subtle zoom */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-[7000ms] ease-out ${
                index === currentSlide ? 'scale-105' : 'scale-100'
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Gradient Overlay for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
            </div>

            {/* Content Container */}
            <div className="relative max-w-7xl mx-auto h-full px-6 flex flex-col justify-end pb-24 text-white">
              <div className="max-w-2xl transform transition-all duration-700 -translate-y-[10vh]">
                <div className="flex items-center space-x-2 text-white/80 text-sm font-medium tracking-wide mb-3 uppercase">
                  <MapPin className="w-4 h-4" />
                  <span>{slide.location}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-white/90 font-light mb-8">
                  {slide.tagline}
                </p>
                <div className="flex items-center space-x-4">
                  <a
                    href="#contact"
                    className="inline-flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-none text-sm font-medium hover:bg-white/90 transition-all"
                  >
                    <span>Solicitar Detalles</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slideshow Controls */}
        <div className="absolute bottom-8 right-6 z-20 flex items-center space-x-4">
          <div className="text-white text-xs tracking-widest font-mono mr-2">
            0{currentSlide + 1} / 0{heroSlides.length}
          </div>
          <button
            onClick={prevSlide}
            aria-label="Diapositiva anterior"
            className="w-10 h-10 rounded-none bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Diapositiva siguiente"
            className="w-10 h-10 rounded-none bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicators Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
          <div
            className="h-full bg-white transition-all duration-500 ease-out"
            style={{ width: `${((currentSlide + 1) / heroSlides.length) * 100}%` }}
          />
        </div>
      </section>

      {/* --- MINI INTRO: HEADING + SUPPORTING TEXT --- */}
      <section className="py-20 px-6 bg-[#F2F2F7] border-t border-b border-[#000000]/5">
        <RevealGroup className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div variants={fadeInUp}>
            <h2 className="text-xs uppercase tracking-widest text-[#515154] font-semibold mb-3">Nuestra Filosofía</h2>
            <p className="text-3xl md:text-4xl font-semibold tracking-tight">
              Vida costera, diseño sin concesiones.
            </p>
          </motion.div>
          <motion.p variants={fadeInUp} className="text-[#515154] font-light leading-relaxed">
            Cada residencia de nuestro portafolio es seleccionada por su integridad arquitectónica y su relación con la costa atlántica. Trabajamos exclusivamente con propietarios y compradores que valoran la privacidad, la artesanía y el diseño perdurable por sobre las tendencias pasajeras.
          </motion.p>
        </RevealGroup>
      </section>

      {/* --- BODY: PROPERTY BENTO GRID --- */}
      <section id="properties" className="py-28 px-6 max-w-7xl mx-auto">
        <Reveal className="text-center max-w-xl mx-auto mb-20">
          <h2 className="text-xs uppercase tracking-widest text-[#515154] font-semibold mb-3">Portafolio</h2>
          <p className="text-3xl md:text-4xl font-semibold tracking-tight">Residencias Costeras Curadas</p>
        </Reveal>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[380px]">
          {properties.map((prop) => (
            <motion.div
              key={prop.id}
              variants={fadeInUp}
              className={`group relative rounded-none overflow-hidden bg-[#E5E5EA] ${prop.span} flex flex-col justify-end p-8 transition-transform duration-500 hover:-translate-y-1`}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${prop.image})` }}
              />
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Top Details (Price Badge) */}
              <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                <span className="bg-white/90 backdrop-blur-md text-black text-xs font-semibold px-3.5 py-1.5 rounded-none shadow-sm">
                  {prop.price}
                </span>
                <span className="w-9 h-9 rounded-none bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 text-white">
                <p className="text-xs text-white/70 font-medium tracking-wide uppercase mb-1">{prop.location}</p>
                <h3 className="text-2xl font-semibold tracking-tight mb-4">{prop.title}</h3>

                {/* Specifications Bar */}
                <div className="flex items-center space-x-6 pt-4 border-t border-white/20 text-xs text-white/80 font-medium">
                  <div className="flex items-center space-x-1.5">
                    <Bed className="w-4 h-4" />
                    <span>{prop.beds} Dorm.</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Bath className="w-4 h-4" />
                    <span>{prop.baths} Baños</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Maximize className="w-4 h-4" />
                    <span>{prop.sqm} m²</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </RevealGroup>
      </section>

      {/* --- NOSOTROS: ABOUT + SERVICES --- */}
      <section id="vision" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left Column: Heading & Text */}
          <Reveal>
            <h2 className="text-xs uppercase tracking-widest text-[#515154] font-semibold mb-3">Nosotros</h2>
            <p className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
              Tres décadas de experiencia costera, un enfoque singular.
            </p>
            <p className="text-[#515154] font-light leading-relaxed">
              Coastal Web nació de la convicción de que una arquitectura excepcional merece un proceso de adquisición igualmente excepcional. Nuestros asesores aportan décadas de experiencia combinada en bienes raíces de lujo, representando un portafolio selecto de las residencias más distinguidas de la costa atlántica.
            </p>
          </Reveal>

          {/* Right Column: Services (3 stacked boxes) */}
          <RevealGroup className="space-y-4">
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                className="flex items-start space-x-5 border border-[#000000]/10 bg-white p-6"
              >
                <div className="w-12 h-12 shrink-0 bg-[#1D1D1F] text-white flex items-center justify-center">
                  <service.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight mb-1">{service.title}</h3>
                  <p className="text-sm text-[#515154] font-light leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </RevealGroup>

        </div>
      </section>

      {/* --- CALL TO ACTION & CONTACT FORM --- */}
      <section id="contact" className="py-28 px-6 bg-[#F2F2F7] border-t border-b border-[#000000]/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left Column: Company Data & Value Prop */}
          <Reveal>
            <h2 className="text-xs uppercase tracking-widest text-[#515154] font-semibold mb-3">Adquisición Privada</h2>
            <p className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
              Comenzá tu camino hacia una vida costera excepcional.
            </p>
            <p className="text-[#515154] font-light leading-relaxed mb-12">
              Nuestros asesores operan con absoluta discreción, representando hitos arquitectónicos de primer nivel a lo largo de la costa atlántica. Contactanos para coordinar una visita privada o publicar una propiedad distinguida.
            </p>

            <div className="space-y-6 pt-6 border-t border-[#000000]/10">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center shadow-sm text-[#1D1D1F]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[#515154] uppercase tracking-wider font-semibold">Casa Central</p>
                  <p className="text-sm font-medium">Av. Roosevelt, Parada 8, Punta del Este, Uruguay</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center shadow-sm text-[#1D1D1F]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[#515154] uppercase tracking-wider font-semibold">Consulta Directa</p>
                  <p className="text-sm font-medium">concierge@coastalweb.com.uy</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center shadow-sm text-[#1D1D1F]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[#515154] uppercase tracking-wider font-semibold">Teléfono</p>
                  <p className="text-sm font-medium">+598 4244 0199</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Minimalist Contact Form */}
          <Reveal delay={0.15} className="bg-white p-8 md:p-10 rounded-none shadow-sm border border-[#000000]/5">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Nombre Completo</label>
                <input
                  type="text"
                  placeholder="Martín Rodríguez"
                  className="w-full bg-[#FBFBFD] border border-[#000000]/10 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Correo Electrónico</label>
                <input
                  type="email"
                  placeholder="martin@rodriguez.com"
                  className="w-full bg-[#FBFBFD] border border-[#000000]/10 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Propiedad de Interés</label>
                <select
                  className="w-full bg-[#FBFBFD] border border-[#000000]/10 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] transition-colors text-[#1D1D1F]"
                >
                  <option>Villa Horizonte, José Ignacio</option>
                  <option>Santuario del Acantilado, Manantiales</option>
                  <option>Pabellón de Cristal, La Barra</option>
                  <option>Residencia Océano Azul, Punta del Este</option>
                  <option>Representación General</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Mensaje</label>
                <textarea
                  rows={4}
                  placeholder="Contanos tus tiempos o requerimientos específicos..."
                  className="w-full bg-[#FBFBFD] border border-[#000000]/10 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1D1D1F] text-white py-3.5 rounded-none text-sm font-medium hover:bg-[#333336] transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Enviar Consulta</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </Reveal>

        </div>
      </section>

      {/* --- FOUR-COLUMN FOOTER --- */}
      <footer className="bg-[#000000] text-[#FBFBFD] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand */}
          <div className="space-y-4">
            <span className="text-lg font-semibold tracking-tight text-white">Coastal.</span>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Redefiniendo la adquisición de propiedades arquitectónicas a lo largo de la costa atlántica con absoluta precisión y elegancia.
            </p>
          </div>

          {/* Column 2: Portfolio */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-white/40 font-semibold">Portafolio</p>
            <ul className="space-y-2.5 text-xs text-white/80 font-light">
              <li><a href="#properties" className="hover:text-white transition-colors">Residencias en José Ignacio</a></li>
              <li><a href="#properties" className="hover:text-white transition-colors">Propiedades en Manantiales</a></li>
              <li><a href="#properties" className="hover:text-white transition-colors">Arquitectura en La Barra</a></li>
              <li><a href="#properties" className="hover:text-white transition-colors">Frente al Mar en Punta del Este</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-white/40 font-semibold">Empresa</p>
            <ul className="space-y-2.5 text-xs text-white/80 font-light">
              <li><a href="#vision" className="hover:text-white transition-colors">Nuestra Visión</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Consejo Asesor</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Prensa y Premios</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Carreras</a></li>
            </ul>
          </div>

          {/* Column 4: Legal & Notice */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-white/40 font-semibold">Legal</p>
            <ul className="space-y-2.5 text-xs text-white/80 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Términos de Servicio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Matrícula de Corredor N.º 0291918</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-white/40 font-light">
          <p>&copy; {new Date().getFullYear()} Coastal Web Estate Inc. Todos los derechos reservados.</p>
          <p className="mt-4 md:mt-0">Diseñado con una atención al detalle de nivel Apple.</p>
        </div>
      </footer>

    </div>
  );
}
