'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Users,
  LogOut,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

const navItems = [
  { href: '/admin', label: 'Panel', icon: LayoutDashboard, exact: true },
  { href: '/admin/properties', label: 'Propiedades', icon: Building2 },
  { href: '/admin/contacts', label: 'Contactos', icon: MessageSquare },
  { href: '/admin/users', label: 'Usuarios', icon: Users },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // TODO(Firebase): once onAuthStateChanged drives `user`/`loading` above,
  // this guard works unchanged.
  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#FBFBFD] flex items-center justify-center">
        <Loader2 className="w-5 h-5 text-[#86868B] animate-spin" />
      </div>
    );
  }

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans antialiased flex">
      {/* --- SIDEBAR --- */}
      <aside className="w-64 shrink-0 h-screen sticky top-0 border-r border-[#000000]/10 bg-white/70 backdrop-blur-xl flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-[#000000]/10">
          <span className="font-semibold text-lg tracking-tight">Coastal.</span>
          <span className="ml-2 text-[10px] uppercase tracking-widest text-[#86868B] font-semibold">Admin</span>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center space-x-3 px-3 py-2.5 text-sm transition-colors ${
                  active ? 'text-[#1D1D1F] font-medium' : 'text-[#515154] hover:text-[#1D1D1F]'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="admin-nav-active"
                    className="absolute inset-0 bg-[#1D1D1F]/[0.06]"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <item.icon className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-[#000000]/10">
          <button
            onClick={() => {
              signOut();
              router.push('/login');
            }}
            className="w-full flex items-center space-x-3 px-3 py-2.5 text-sm text-[#515154] hover:text-[#1D1D1F] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN COLUMN --- */}
      <div className="flex-1 min-w-0">
        <header className="h-16 sticky top-0 z-30 flex items-center justify-between px-8 border-b border-[#000000]/10 bg-[#FBFBFD]/80 backdrop-blur-xl">
          <div />
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium leading-tight">{user.name}</p>
              <p className="text-xs text-[#86868B] leading-tight">{user.email}</p>
            </div>
            <div className="w-9 h-9 bg-[#1D1D1F] text-white flex items-center justify-center text-sm font-semibold shrink-0">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}
