'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Trash2, Pencil, Bed, Bath, Maximize, ArrowUpRight } from 'lucide-react';
import { initialProperties, Property, PropertyStatus } from '@/lib/mock-data';
import AddPropertyModal, { NewPropertyInput } from '@/components/AddPropertyModal';

// TODO(Firebase): this whole page swaps its useState<Property[]> for a
// onSnapshot(collection(db, 'properties'), ...) subscription. Add/edit/delete
// below become addDoc(...) / updateDoc(...) / deleteDoc(doc(db, 'properties', id)).

let nextId = initialProperties.length + 1;

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const filtered = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.location.toLowerCase().includes(query.toLowerCase())
  );

  const openAddModal = () => {
    setEditingProperty(null);
    setModalOpen(true);
  };

  const openEditModal = (property: Property) => {
    setEditingProperty(property);
    setModalOpen(true);
  };

  const handleModalSubmit = (data: NewPropertyInput) => {
    if (editingProperty) {
      // TODO(Firebase): await updateDoc(doc(db, 'properties', editingProperty.id), data)
      setProperties((prev) => prev.map((p) => (p.id === editingProperty.id ? { ...p, ...data } : p)));
    } else {
      const newProperty: Property = {
        id: String(nextId++),
        ...data,
        images: [data.image],
        editorialStory: [],
        status: 'Publicada',
      };
      // TODO(Firebase): await addDoc(collection(db, 'properties'), newProperty)
      setProperties((prev) => [newProperty, ...prev]);
    }
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
          onClick={openAddModal}
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
                      <Link
                        href={`/properties/${p.id}`}
                        target="_blank"
                        className="font-medium inline-flex items-center gap-1 hover:underline"
                      >
                        {p.title}
                        <ArrowUpRight className="w-3 h-3 text-[#86868B]" />
                      </Link>
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
                      <span className="inline-flex items-center space-x-3">
                        <button
                          onClick={() => openEditModal(p)}
                          className="text-[#86868B] hover:text-[#1D1D1F] transition-colors"
                          aria-label="Editar propiedad"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setPendingDelete(p.id)}
                          className="text-[#86868B] hover:text-red-600 transition-colors"
                          aria-label="Eliminar propiedad"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </span>
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

      <AddPropertyModal
        key={editingProperty?.id ?? 'add'}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={editingProperty ?? undefined}
      />
    </div>
  );
}
