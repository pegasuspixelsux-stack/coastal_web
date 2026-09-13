'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Trash2, X, Bed, Bath, Maximize } from 'lucide-react';
import { initialProperties, Property, PropertyStatus } from '@/lib/mock-data';

// TODO(Firebase): this whole page swaps its useState<Property[]> for a
// onSnapshot(collection(db, 'properties'), ...) subscription. Add/delete
// below become addDoc(...) / deleteDoc(doc(db, 'properties', id)).

let nextId = initialProperties.length + 1;

const emptyForm = {
  title: '',
  location: '',
  price: '',
  beds: '',
  baths: '',
  sqm: '',
  image: '',
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const filtered = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.location.toLowerCase().includes(query.toLowerCase())
  );

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const newProperty: Property = {
      id: String(nextId++),
      title: form.title,
      location: form.location,
      price: form.price,
      beds: Number(form.beds) || 0,
      baths: Number(form.baths) || 0,
      sqm: form.sqm,
      image: form.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
      status: 'Borrador',
    };
    // TODO(Firebase): await addDoc(collection(db, 'properties'), newProperty)
    setProperties((prev) => [newProperty, ...prev]);
    setForm(emptyForm);
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    // TODO(Firebase): await deleteDoc(doc(db, 'properties', id))
    setProperties((prev) => prev.filter((p) => p.id !== id));
    setPendingDelete(null);
  };

  const toggleStatus = (id: string) => {
    // TODO(Firebase): await updateDoc(doc(db, 'properties', id), { status })
    setProperties((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: (p.status === 'Publicada' ? 'Borrador' : 'Publicada') as PropertyStatus }
          : p
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Propiedades</h1>
          <p className="text-sm text-[#515154] mt-1">{properties.length} propiedades en el portafolio.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center space-x-2 bg-[#1D1D1F] text-white text-sm font-medium px-4 py-2.5 hover:bg-[#333336] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Propiedad</span>
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por título o ubicación..."
          className="w-full bg-white border border-[#000000]/10 pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#1D1D1F] transition-colors"
        />
      </div>

      <div className="bg-white border border-[#000000]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#000000]/10 text-left text-xs uppercase tracking-wider text-[#86868B]">
                <th className="px-6 py-3 font-semibold">Propiedad</th>
                <th className="px-6 py-3 font-semibold">Ubicación</th>
                <th className="px-6 py-3 font-semibold">Precio</th>
                <th className="px-6 py-3 font-semibold">Detalles</th>
                <th className="px-6 py-3 font-semibold">Estado</th>
                <th className="px-6 py-3 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#000000]/10">
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-12 h-12 bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url(${p.image})` }}
                      />
                      <span className="font-medium">{p.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#515154]">{p.location}</td>
                  <td className="px-6 py-4 font-mono">{p.price}</td>
                  <td className="px-6 py-4 text-[#515154]">
                    <div className="flex items-center space-x-3 text-xs">
                      <span className="flex items-center space-x-1"><Bed className="w-3.5 h-3.5" /><span>{p.beds}</span></span>
                      <span className="flex items-center space-x-1"><Bath className="w-3.5 h-3.5" /><span>{p.baths}</span></span>
                      <span className="flex items-center space-x-1"><Maximize className="w-3.5 h-3.5" /><span>{p.sqm} m²</span></span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(p.id)}
                      className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 transition-colors ${
                        p.status === 'Publicada' ? 'bg-[#1D1D1F] text-white' : 'bg-[#F2F2F7] text-[#86868B]'
                      }`}
                    >
                      {p.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {pendingDelete === p.id ? (
                      <span className="inline-flex items-center space-x-2 text-xs">
                        <span className="text-[#515154]">¿Eliminar?</span>
                        <button onClick={() => handleDelete(p.id)} className="font-semibold text-red-600 hover:underline">Sí</button>
                        <button onClick={() => setPendingDelete(null)} className="text-[#86868B] hover:underline">No</button>
                      </span>
                    ) : (
                      <button
                        onClick={() => setPendingDelete(p.id)}
                        className="text-[#86868B] hover:text-red-600 transition-colors"
                        aria-label="Eliminar propiedad"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-[#86868B] text-sm">
                    No se encontraron propiedades.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- ADD PROPERTY MODAL --- */}
      <AnimatePresence>
        {modalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-6"
            >
              <div className="bg-white w-full max-w-lg p-8 shadow-xl relative">
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-6 right-6 text-[#86868B] hover:text-[#1D1D1F] transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className="text-lg font-semibold tracking-tight mb-6">Agregar Propiedad</h2>

                <form onSubmit={handleAdd} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Título</label>
                      <input
                        required
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full bg-[#FBFBFD] border border-[#000000]/10 px-4 py-2.5 text-sm focus:outline-none focus:border-[#1D1D1F]"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Ubicación</label>
                      <input
                        required
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        placeholder="José Ignacio, UY"
                        className="w-full bg-[#FBFBFD] border border-[#000000]/10 px-4 py-2.5 text-sm focus:outline-none focus:border-[#1D1D1F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Precio</label>
                      <input
                        required
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        placeholder="$10.000.000"
                        className="w-full bg-[#FBFBFD] border border-[#000000]/10 px-4 py-2.5 text-sm focus:outline-none focus:border-[#1D1D1F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">m²</label>
                      <input
                        value={form.sqm}
                        onChange={(e) => setForm({ ...form, sqm: e.target.value })}
                        className="w-full bg-[#FBFBFD] border border-[#000000]/10 px-4 py-2.5 text-sm focus:outline-none focus:border-[#1D1D1F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Dormitorios</label>
                      <input
                        type="number"
                        value={form.beds}
                        onChange={(e) => setForm({ ...form, beds: e.target.value })}
                        className="w-full bg-[#FBFBFD] border border-[#000000]/10 px-4 py-2.5 text-sm focus:outline-none focus:border-[#1D1D1F]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Baños</label>
                      <input
                        type="number"
                        value={form.baths}
                        onChange={(e) => setForm({ ...form, baths: e.target.value })}
                        className="w-full bg-[#FBFBFD] border border-[#000000]/10 px-4 py-2.5 text-sm focus:outline-none focus:border-[#1D1D1F]"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">URL de Imagen</label>
                      <input
                        value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                        placeholder="https://..."
                        className="w-full bg-[#FBFBFD] border border-[#000000]/10 px-4 py-2.5 text-sm focus:outline-none focus:border-[#1D1D1F]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1D1D1F] text-white py-3 text-sm font-medium hover:bg-[#333336] transition-all mt-2"
                  >
                    Guardar como Borrador
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
