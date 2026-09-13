'use client';

import { useState, useEffect } from 'react';
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
  Menu,
  X,
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close the mobile drawer whenever the route changes. Adjusting state
  // during render (rather than in an effect) is the pattern React itself
  // recommends for "reset state when a prop changes" — see
  // https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setSidebarOpen(false);
  }

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
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans antialiased lg:flex">
      {/* --- MOBILE BACKDROP --- */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* --- SIDEBAR (fixed drawer on mobile, static column on lg+) --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 h-screen border-r border-[#000000]/10 bg-white/90 backdrop-blur-xl flex flex-col transform transition-transform duration-300 ease-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:sticky lg:top-0 lg:z-auto lg:shrink-0`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#000000]/10">
          <div>
            <span className="font-semibold text-lg tracking-tight">Coastal.</span>
            <span className="ml-2 text-[10px] uppercase tracking-widest text-[#86868B] font-semibold">Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-[#86868B] hover:text-[#1D1D1F] transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
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
        <header className="h-16 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 border-b border-[#000000]/10 bg-[#FBFBFD]/80 backdrop-blur-xl">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-[#1D1D1F]"
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium leading-tight">{user.name}</p>
              <p className="text-xs text-[#86868B] leading-tight">{user.email}</p>
            </div>
            <div className="w-9 h-9 bg-[#1D1D1F] text-white flex items-center justify-center text-sm font-semibold shrink-0">
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
