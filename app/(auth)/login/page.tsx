'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

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

  const handleSubmit = async (e: FormEvent) => {
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
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] flex items-center justify-center px-6 font-sans antialiased">
      {/* Ambient backdrop */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-[#1D1D1F]/[0.03] rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[32rem] h-[32rem] bg-[#1D1D1F]/[0.03] rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-sm"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-[#000000]/10 shadow-sm p-8">
          <div className="mb-8 text-center">
            <span className="font-semibold text-xl tracking-tight">Coastal.</span>
            <p className="text-xs uppercase tracking-widest text-[#515154] font-semibold mt-2">
              Panel de Administración
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@coastalweb.com.uy"
                  className="w-full bg-[#FBFBFD] border border-[#000000]/10 rounded-none pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#515154] mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#86868B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#FBFBFD] border border-[#000000]/10 rounded-none pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#1D1D1F] transition-colors"
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="text-xs text-red-600 font-medium"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#1D1D1F] text-white py-3.5 rounded-none text-sm font-medium hover:bg-[#333336] transition-all flex items-center justify-center space-x-2 shadow-sm disabled:opacity-60"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Iniciar Sesión</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[#86868B]">
            admin@coastalweb.com.uy · admin123
          </p>
        </div>
      </motion.div>
    </div>
  );
}
