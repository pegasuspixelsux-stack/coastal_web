'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

const BACKGROUND_IMAGE =
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop';

export default function LoginPage() {
  const router = useRouter();
  const { user, loading, signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Already signed in? Skip straight to the dashboard.
  useEffect(() => {
    if (!loading && user) router.replace('/admin');
  }, [loading, user, router]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    // TODO(Firebase): this call already matches the shape of
    // signInWithEmailAndPassword(auth, email, password) — see lib/auth-context.tsx
    const result = await signIn(email, password);

    setSubmitting(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    router.push('/admin');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans antialiased text-[#1D1D1F]">
      {/* Full-size Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[10000ms]"
        style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50" />
      </div>

      {/* Back to site */}
      <Link
        href="/"
        className="absolute top-8 left-8 z-20 inline-flex items-center space-x-2 text-white/80 hover:text-white text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al sitio</span>
      </Link>

      {/* Desktop branding, bottom-left over the image */}
      <div className="hidden lg:block absolute bottom-10 left-10 z-20 text-white">
        <span className="font-semibold text-2xl tracking-tight">Coastal.</span>
        <p className="text-sm text-white/70 font-light mt-2">Panel comercial de gestión</p>
        <p className="text-xs text-white/50 font-mono mt-1">Coastal version 1.0</p>
      </div>

      {/* Login card */}
      <div className="relative z-10 h-full flex items-center justify-center lg:justify-end px-6 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-sm"
        >
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl p-8 text-white">
            <div className="mb-8 text-center">
              <span className="font-semibold text-xl tracking-tight">Coastal.</span>
              <p className="text-xs uppercase tracking-widest text-white/60 font-semibold mt-2">
                Panel de Administración
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-white/60 mb-2">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@coastalweb.com.uy"
                    className="w-full bg-white/10 border border-white/20 rounded-none pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-white/60 mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-white/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/10 border border-white/20 rounded-none pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/60 transition-colors"
                  />
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="text-xs text-red-300 font-medium"
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-white text-[#1D1D1F] py-3.5 rounded-none text-sm font-medium hover:bg-white/90 transition-all flex items-center justify-center space-x-2 shadow-lg mt-4 disabled:opacity-60"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <span>Acceder al Panel</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-white/50">
              admin@coastalweb.com.uy · admin123
            </p>
          </div>

          {/* Mobile footer version info (visible on smaller screens) */}
          <div className="mt-8 lg:hidden text-center text-xs text-white/60 font-light">
            <p>Panel comercial de gestión</p>
            <p className="mt-1 font-medium text-white/80">Coastal version 1.0</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
