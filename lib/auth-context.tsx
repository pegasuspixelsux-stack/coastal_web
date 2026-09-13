'use client';

// --- MOCK AUTH LAYER ---
// Stands in for Firebase Auth until the real integration is wired up.
// Injection points are marked inline:
//
//   restoring the session on load -> onAuthStateChanged(auth, callback)
//   signIn()                      -> signInWithEmailAndPassword(auth, email, password)
//   signOut()                     -> signOut(auth)

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface AdminSession {
  uid: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: AdminSession | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const SESSION_KEY = 'coastal_admin_session';

// Mock credential store. Replace with Firebase Auth users once wired up.
const MOCK_CREDENTIALS = {
  email: 'admin@coastalweb.com.uy',
  password: 'admin123',
  session: {
    uid: 'mock-admin-1',
    name: 'Camila Estévez',
    email: 'admin@coastalweb.com.uy',
  } satisfies AdminSession,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminSession | null>(null);
  const [loading, setLoading] = useState(true);

  // TODO(Firebase): replace this whole effect with
  //   return onAuthStateChanged(auth, (firebaseUser) => {
  //     setUser(firebaseUser ? mapFirebaseUser(firebaseUser) : null);
  //     setLoading(false);
  //   });
  useEffect(() => {
    // Restoring the session is genuinely async in the real (Firebase)
    // implementation, so this mirrors that shape rather than reading
    // localStorage synchronously inside the effect body.
    const timer = setTimeout(() => {
      let restored: AdminSession | null = null;
      try {
        const stored = localStorage.getItem(SESSION_KEY);
        restored = stored ? JSON.parse(stored) : null;
      } catch {
        // ignore malformed/inaccessible storage
      }
      setUser(restored);
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // TODO(Firebase): replace with
  //   const cred = await signInWithEmailAndPassword(auth, email, password);
  //   return {}; // onAuthStateChanged above will pick up the new session
  const signIn: AuthContextValue['signIn'] = async (email, password) => {
    await new Promise((resolve) => setTimeout(resolve, 400)); // simulate network

    if (email.trim().toLowerCase() !== MOCK_CREDENTIALS.email || password !== MOCK_CREDENTIALS.password) {
      return { error: 'Correo electrónico o contraseña incorrectos.' };
    }

    setUser(MOCK_CREDENTIALS.session);
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(MOCK_CREDENTIALS.session));
    } catch {
      // ignore
    }
    return {};
  };

  // TODO(Firebase): replace with `await signOut(auth)`
  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
