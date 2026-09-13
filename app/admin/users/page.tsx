'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X } from 'lucide-react';
import { initialAdminUsers, AdminUser, AdminRole } from '@/lib/mock-data';

// TODO(Firebase): swap useState<AdminUser[]> for getDocs(collection(db,
// 'users')) / onSnapshot. Adding a user in production should go through
// Firebase Admin SDK (server-side) rather than a client addDoc, since it
// also needs an Auth account created.

let nextId = initialAdminUsers.length + 1;

const roles: AdminRole[] = ['Administrador', 'Editor'];

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(initialAdminUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<AdminRole>('Editor');
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const newUser: AdminUser = { id: String(nextId++), name, email, role };
    // TODO(Firebase): await addDoc(collection(db, 'users'), newUser)
    setUsers((prev) => [...prev, newUser]);
    setName('');
    setEmail('');
    setRole('Editor');
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    // TODO(Firebase): await deleteDoc(doc(db, 'users', id))
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setPendingDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Usuarios</h1>
          <p className="text-sm text-[#515154] mt-1">{users.length} usuarios con acceso al panel.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center space-x-2 bg-[#1D1D1F] text-white text-sm font-medium px-4 py-2.5 hover:bg-[#333336] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Agregar Usuario</span>
        </button>
      </div>

      <div className="bg-white border border-[#000000]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#000000]/10 text-left text-xs uppercase tracking-wider text-[#86868B]">
                <th className="px-6 py-3 font-semibold">Nombre</th>
                <th className="px-6 py-3 font-semibold">Correo Electrónico</th>
                <th className="px-6 py-3 font-semibold">Rol</th>
                <th className="px-6 py-3 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#000000]/10">
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#1D1D1F] text-white flex items-center justify-center text-xs font-semibold shrink-0">
                      {u.name.charAt(0)}
                    </div>
                    <span className="font-medium">{u.name}</span>
                  </td>
                  <td className="px-6 py-4 text-[#515154]">{u.email}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 bg-[#F2F2F7] text-[#1D1D1F]">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {pendingDelete === u.id ? (
                      <span className="inline-flex items-center space-x-2 text-xs">
                        <span className="text-[#515154]">¿Eliminar?</span>
                        <button onClick={() => handleDelete(u.id)} className="font-semibold text-red-600 hover:underline">Sí</button>
                        <button onClick={() => setPendingDelete(null)} className="text-[#86868B] hover:underline">No</button>
                      </span>
                    ) : (
                      <button
                        onClick={() => setPendingDelete(u.id)}
                        className="text-[#86868B] hover:text-red-600 transition-colors"
                        aria-label="Eliminar usuario"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
              <div className="bg-white w-full max-w-sm p-8 shadow-xl relative">
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-6 right-6 text-[#86868B] hover:text-[#1D1D1F] transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>

                <h2 className="text-lg font-semibold tracking-tight mb-6">Agregar Usuario</h2>

                <form onSubmit={handleAdd} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Nombre</label>
                    <input
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#FBFBFD] border border-[#000000]/10 px-4 py-2.5 text-sm focus:outline-none focus:border-[#1D1D1F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Correo Electrónico</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FBFBFD] border border-[#000000]/10 px-4 py-2.5 text-sm focus:outline-none focus:border-[#1D1D1F]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">Rol</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as AdminRole)}
                      className="w-full bg-[#FBFBFD] border border-[#000000]/10 px-4 py-2.5 text-sm focus:outline-none focus:border-[#1D1D1F]"
                    >
                      {roles.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1D1D1F] text-white py-3 text-sm font-medium hover:bg-[#333336] transition-all mt-2"
                  >
                    Agregar Usuario
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
