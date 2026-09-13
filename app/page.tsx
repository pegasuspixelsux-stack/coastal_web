'use client';

import { useState, useEffect } from 'react';
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
} from 'lucide-react';

// --- HERO SLIDES DATA ---
const heroSlides = [
  {
    id: 1,
    title: "The Horizon Villa",
    location: "Big Sur, California",
    tagline: "Absolute privacy meets endless Pacific views.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Cliffside Sanctuary",
    location: "Malibu, California",
    tagline: "Suspended between sky and sea.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "The Glass Pavilion",
    location: "Carmel-by-the-Sea",
    tagline: "Seamless architectural integration with nature.",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Ocean Blue Estate",
    location: "Laguna Beach, California",
    tagline: "Timeless luxury on the water's edge.",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "The Dune House",
    location: "Monterey, California",
    tagline: "Minimalist living shaped by coastal winds.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
  },
];

// --- HARDCODED PROPERTIES (Bento Grid) ---
const properties = [
  {
    id: 1,
    title: "The Horizon Villa",
    location: "Big Sur, CA",
    price: "$14,500,000",
    beds: 5,
    baths: 6,
    sqft: "6,200",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    span: "col-span-1 md:col-span-2 row-span-2", // Large feature card
  },
  {
    id: 2,
    title: "Cliffside Sanctuary",
    location: "Malibu, CA",
    price: "$9,800,000",
    beds: 4,
    baths: 4.5,
    sqft: "4,500",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    span: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: 3,
    title: "The Glass Pavilion",
    location: "Carmel, CA",
    price: "$11,200,000",
    beds: 3,
    baths: 3.5,
    sqft: "3,900",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&auto=format&fit=crop",
    span: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: 4,
    title: "Ocean Blue Estate",
    location: "Laguna Beach, CA",
    price: "$18,500,000",
    beds: 6,
    baths: 7,
    sqft: "8,100",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
    span: "col-span-1 md:col-span-2 row-span-2", // Large feature card
  },
  {
    id: 5,
    title: "The Dune House",
    location: "Monterey, CA",
    price: "$7,400,000",
    beds: 3,
    baths: 3,
    sqft: "3,200",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    span: "col-span-1 md:col-span-1 row-span-1",
  },
  {
    id: 6,
    title: "Pacific Horizon",
    location: "Pebble Beach, CA",
    price: "$12,900,000",
    beds: 4,
    baths: 5,
    sqft: "5,100",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    span: "col-span-1 md:col-span-1 row-span-1",
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
            <a href="#properties" className="hover:text-[#1D1D1F] transition-colors">Properties</a>
            <a href="#vision" className="hover:text-[#1D1D1F] transition-colors">Vision</a>
            <a href="#contact" className="hover:text-[#1D1D1F] transition-colors">Inquire</a>
          </nav>
          <a
            href="#contact"
            className="bg-[#1D1D1F] text-[#FFFFFF] text-xs font-medium px-4 py-2 rounded-none hover:bg-[#333336] transition-all"
          >
            Private Tour
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
              <div className="max-w-2xl transform transition-all duration-700 translate-y-0">
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
                    <span>Request Details</span>
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
            aria-label="Previous slide"
            className="w-10 h-10 rounded-none bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
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
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-[#515154] font-semibold mb-3">Our Philosophy</h2>
            <p className="text-3xl md:text-4xl font-semibold tracking-tight">
              Coastal living, uncompromising design.
            </p>
          </div>
          <p className="text-[#515154] font-light leading-relaxed">
            Every residence in our portfolio is selected for its architectural integrity and its relationship to the Pacific coastline. We work exclusively with owners and buyers who value privacy, craftsmanship, and enduring design over fleeting trends.
          </p>
        </div>
      </section>

      {/* --- BODY: PROPERTY BENTO GRID --- */}
      <section id="properties" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-20">
          <h2 className="text-xs uppercase tracking-widest text-[#515154] font-semibold mb-3">Portfolio</h2>
          <p className="text-3xl md:text-4xl font-semibold tracking-tight">Curated Coastal Residences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[380px]">
          {properties.map((prop) => (
            <div
              key={prop.id}
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
                    <span>{prop.beds} Beds</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Bath className="w-4 h-4" />
                    <span>{prop.baths} Baths</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Maximize className="w-4 h-4" />
                    <span>{prop.sqft} sqft</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CALL TO ACTION & CONTACT FORM --- */}
      <section id="contact" className="py-28 px-6 bg-[#F2F2F7] border-t border-b border-[#000000]/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left Column: Company Data & Value Prop */}
          <div>
            <h2 className="text-xs uppercase tracking-widest text-[#515154] font-semibold mb-3">Private Acquisition</h2>
            <p className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
              Begin your journey to exceptional coastal living.
            </p>
            <p className="text-[#515154] font-light leading-relaxed mb-12">
              Our advisors operate with absolute discretion, representing premier architectural landmarks along the Pacific coastline. Connect with us to schedule a private viewing or list a distinguished property.
            </p>

            <div className="space-y-6 pt-6 border-t border-[#000000]/10">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center shadow-sm text-[#1D1D1F]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[#515154] uppercase tracking-wider font-semibold">Headquarters</p>
                  <p className="text-sm font-medium">101 Ocean Avenue, Carmel-by-the-Sea, CA</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center shadow-sm text-[#1D1D1F]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[#515154] uppercase tracking-wider font-semibold">Direct Inquiry</p>
                  <p className="text-sm font-medium">concierge@coastalweb.estate</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-none bg-white flex items-center justify-center shadow-sm text-[#1D1D1F]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[#515154] uppercase tracking-wider font-semibold">Telephone</p>
                  <p className="text-sm font-medium">+1 (831) 555-0199</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Minimalist Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-none shadow-sm border border-[#000000]/5">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Jonathan Vance"
                  className="w-full bg-[#FBFBFD] border border-[#000000]/10 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="jonathan@vance.com"
                  className="w-full bg-[#FBFBFD] border border-[#000000]/10 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Property of Interest</label>
                <select
                  className="w-full bg-[#FBFBFD] border border-[#000000]/10 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] transition-colors text-[#1D1D1F]"
                >
                  <option>The Horizon Villa, Big Sur</option>
                  <option>Cliffside Sanctuary, Malibu</option>
                  <option>The Glass Pavilion, Carmel</option>
                  <option>Ocean Blue Estate, Laguna Beach</option>
                  <option>General Representation</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Message</label>
                <textarea
                  rows={4}
                  placeholder="Share your timeline or specific requirements..."
                  className="w-full bg-[#FBFBFD] border border-[#000000]/10 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#1D1D1F] text-white py-3.5 rounded-none text-sm font-medium hover:bg-[#333336] transition-all flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Submit Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* --- FOUR-COLUMN FOOTER --- */}
      <footer className="bg-[#1D1D1F] text-[#FBFBFD] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand */}
          <div className="space-y-4">
            <span className="text-lg font-semibold tracking-tight text-white">Coastal.</span>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              Redefining architectural property acquisition along the Pacific Coast with absolute precision and elegance.
            </p>
          </div>

          {/* Column 2: Portfolio */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-white/40 font-semibold">Portfolio</p>
            <ul className="space-y-2.5 text-xs text-white/80 font-light">
              <li><a href="#properties" className="hover:text-white transition-colors">Big Sur Residences</a></li>
              <li><a href="#properties" className="hover:text-white transition-colors">Malibu Estates</a></li>
              <li><a href="#properties" className="hover:text-white transition-colors">Carmel Architecture</a></li>
              <li><a href="#properties" className="hover:text-white transition-colors">Laguna Beachfront</a></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-white/40 font-semibold">Company</p>
            <ul className="space-y-2.5 text-xs text-white/80 font-light">
              <li><a href="#vision" className="hover:text-white transition-colors">Our Vision</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Advisory Board</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Press & Awards</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Column 4: Legal & Notice */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-white/40 font-semibold">Legal</p>
            <ul className="space-y-2.5 text-xs text-white/80 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Brokerage License #0291918</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-white/40 font-light">
          <p>&copy; {new Date().getFullYear()} Coastal Web Estate Inc. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Designed with Apple-level attention to detail.</p>
        </div>
      </footer>

    </div>
  );
}
