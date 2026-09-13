'use client';

import { motion, type Variants } from 'framer-motion';
import { Building2, MessageSquare, Users, TrendingUp } from 'lucide-react';
import { initialProperties, initialContacts, initialAdminUsers } from '@/lib/mock-data';

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const statusStyles: Record<string, string> = {
  Nuevo: 'bg-[#1D1D1F] text-white',
  Contactado: 'bg-[#F2F2F7] text-[#1D1D1F]',
  Cerrado: 'bg-[#F2F2F7] text-[#86868B]',
};

function parsePrice(price: string) {
  return Number(price.replace(/[^0-9]/g, '')) || 0;
}

export default function AdminDashboardPage() {
  const totalValue = initialProperties.reduce((sum, p) => sum + parsePrice(p.price), 0);
  const newContacts = initialContacts.filter((c) => c.status === 'Nuevo').length;

  const stats = [
    {
      label: 'Propiedades Activas',
      value: initialProperties.filter((p) => p.status === 'Publicada').length,
      icon: Building2,
    },
    {
      label: 'Valor del Portafolio',
      value: `$${(totalValue / 1_000_000).toFixed(1)}M`,
      icon: TrendingUp,
    },
    {
      label: 'Consultas Nuevas',
      value: newContacts,
      icon: MessageSquare,
    },
    {
      label: 'Usuarios del Sistema',
      value: initialAdminUsers.length,
      icon: Users,
    },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={container} className="space-y-10">
      <motion.div variants={item}>
        <h1 className="text-2xl font-semibold tracking-tight">Panel General</h1>
        <p className="text-sm text-[#515154] mt-1">Resumen de la actividad de Coastal Web.</p>
      </motion.div>

      {/* Stat tiles */}
      <motion.div variants={container} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={item}
            className="bg-white border border-[#000000]/10 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase tracking-widest text-[#515154] font-semibold">
                {stat.label}
              </span>
              <stat.icon className="w-4 h-4 text-[#86868B]" />
            </div>
            <p className="text-3xl font-semibold tracking-tight font-mono">{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent contacts */}
        <motion.div variants={item} className="bg-white border border-[#000000]/10">
          <div className="px-6 py-4 border-b border-[#000000]/10">
            <h2 className="text-sm font-semibold">Consultas Recientes</h2>
          </div>
          <ul className="divide-y divide-[#000000]/10">
            {initialContacts.slice(0, 5).map((c) => (
              <li key={c.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{c.name}</p>
                  <p className="text-xs text-[#86868B] truncate">{c.property}</p>
                </div>
                <span className={`shrink-0 text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 ${statusStyles[c.status]}`}>
                  {c.status}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Property snapshot */}
        <motion.div variants={item} className="bg-white border border-[#000000]/10">
          <div className="px-6 py-4 border-b border-[#000000]/10">
            <h2 className="text-sm font-semibold">Portafolio Reciente</h2>
          </div>
          <ul className="divide-y divide-[#000000]/10">
            {initialProperties.slice(0, 5).map((p) => (
              <li key={p.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{p.title}</p>
                  <p className="text-xs text-[#86868B] truncate">{p.location}</p>
                </div>
                <span className="shrink-0 text-sm font-mono">{p.price}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}
