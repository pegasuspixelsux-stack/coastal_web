'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { initialContacts, Contact, ContactStatus } from '@/lib/mock-data';

// TODO(Firebase): swap useState<Contact[]> for onSnapshot(collection(db,
// 'contacts'), ...). Status changes below become updateDoc(doc(db,
// 'contacts', id), { status }).

const statuses: ContactStatus[] = ['Nuevo', 'Contactado', 'Cerrado'];

const statusStyles: Record<ContactStatus, string> = {
  Nuevo: 'bg-[#1D1D1F] text-white',
  Contactado: 'bg-[#F2F2F7] text-[#1D1D1F]',
  Cerrado: 'bg-[#F2F2F7] text-[#86868B]',
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  const updateStatus = (id: string, status: ContactStatus) => {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Contactos</h1>
        <p className="text-sm text-[#515154] mt-1">{contacts.length} consultas recibidas desde el sitio.</p>
      </div>

      <div className="space-y-4">
        {contacts.map((c) => (
          <div key={c.id} className="bg-white border border-[#000000]/10 p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-medium">{c.name}</h3>
                  <a href={`mailto:${c.email}`} className="text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors inline-flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {c.email}
                  </a>
                </div>
                <p className="text-xs text-[#515154] mt-1">{c.property}</p>
              </div>
              <span className="text-xs text-[#86868B] font-mono shrink-0">{c.date}</span>
            </div>

            <p className="text-sm text-[#515154] font-light leading-relaxed mt-4 border-t border-[#000000]/10 pt-4">
              {c.message}
            </p>

            <div className="flex items-center gap-2 mt-4">
              {statuses.map((s) => (
                <button
                  key={s}
                  onClick={() => updateStatus(c.id, s)}
                  className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 transition-colors ${
                    c.status === s ? statusStyles[s] : 'bg-transparent text-[#86868B] border border-[#000000]/10 hover:border-[#1D1D1F]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
