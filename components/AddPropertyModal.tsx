'use client';

// Reusable modal for adding/publishing a property from the admin panel.
// Owns its own form state; the parent only receives the finished input
// via onSubmit and decides how to persist it (mock array today,
// addDoc(collection(db, 'properties'), ...) once Firebase is wired up).

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Save } from 'lucide-react';

export interface NewPropertyInput {
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqm: string;
  image: string;
}

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NewPropertyInput) => void;
  /** Pass the current values to edit an existing property; omit to add a new one. */
  initialData?: NewPropertyInput;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop';

const emptyFormData = {
  title: '',
  location: '',
  price: '',
  beds: '',
  baths: '',
  sqm: '',
  image: '',
};

function toFormData(data: NewPropertyInput) {
  return {
    title: data.title,
    location: data.location,
    price: data.price,
    beds: String(data.beds),
    baths: String(data.baths),
    sqm: data.sqm,
    image: data.image,
  };
}

export default function AddPropertyModal({ isOpen, onClose, onSubmit, initialData }: AddPropertyModalProps) {
  const isEditMode = Boolean(initialData);
  // Lazy-initialized once per mount. The parent forces a remount (via a
  // `key` keyed to the property being edited, or to "add") whenever it
  // opens the modal for a different target, so this always seeds fresh.
  const [formData, setFormData] = useState(() => (initialData ? toFormData(initialData) : emptyFormData));

  const handleClose = () => {
    setFormData(initialData ? toFormData(initialData) : emptyFormData);
    onClose();
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: formData.title,
      location: formData.location,
      price: formData.price,
      beds: Number(formData.beds) || 0,
      baths: Number(formData.baths) || 0,
      sqm: formData.sqm,
      image: formData.image || FALLBACK_IMAGE,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
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
                onClick={handleClose}
                className="absolute top-6 right-6 text-[#86868B] hover:text-[#1D1D1F] transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-lg font-semibold tracking-tight mb-6">
                {isEditMode ? 'Editar Propiedad' : 'Agregar Propiedad'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Título</label>
                    <input
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Villa Horizonte"
                      className="w-full bg-[#FBFBFD] border border-[#000000]/10 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] transition-colors"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Ubicación</label>
                    <input
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="José Ignacio, UY"
                      className="w-full bg-[#FBFBFD] border border-[#000000]/10 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Precio</label>
                    <input
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="US$10.000.000"
                      className="w-full bg-[#FBFBFD] border border-[#000000]/10 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">m²</label>
                    <input
                      required
                      value={formData.sqm}
                      onChange={(e) => setFormData({ ...formData, sqm: e.target.value })}
                      placeholder="450"
                      className="w-full bg-[#FBFBFD] border border-[#000000]/10 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Dormitorios</label>
                    <input
                      type="number"
                      required
                      placeholder="4"
                      value={formData.beds}
                      onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                      className="w-full bg-[#FBFBFD] border border-[#000000]/10 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Baños</label>
                    <input
                      type="number"
                      step="0.5"
                      required
                      placeholder="4.5"
                      value={formData.baths}
                      onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
                      className="w-full bg-[#FBFBFD] border border-[#000000]/10 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] transition-colors"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">URL de Imagen</label>
                    <input
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-[#FBFBFD] border border-[#000000]/10 rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-[#000000]/5 flex items-center justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-3 text-sm font-medium text-[#515154] hover:bg-[#F2F2F7] transition-all"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 text-sm font-medium bg-[#1D1D1F] text-white hover:bg-[#333336] transition-all flex items-center space-x-2 shadow-sm"
                  >
                    {isEditMode ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    <span>{isEditMode ? 'Guardar Cambios' : 'Publicar Propiedad'}</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
