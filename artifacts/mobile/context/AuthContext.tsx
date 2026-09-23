import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getApiBase } from '@/lib/api-config';

/**
 * Auth storage key (v2 — uses server-issued JWTs, not local fake tokens).
 * A separate key avoids collisions with the old local-only auth storage.
 */
const AUTH_KEY = '@plantes_sacrees_auth_v2';

// ── Types ─────────────────────────────────────────────────────────────────────

interface AuthUser {
  id: number;
  username: string;
}

interface StoredAuth {
  user: AuthUser;
  token: string;
}

interface AuthContextType {
  user: AuthUser | null;
  /** Server-issued JWT. Include as `Authorization: Bearer <token>` on AI requests. */
  token: string | null;
  isLoading: boolean;
  register: (username: string, password: string) => Promise<{ error?: string }>;
  login: (username: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ── Provider ──────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from storage on mount
  useEffect(() => {
    let cancelled = false;
    const timeout = setTimeout(() => {
      if (!cancelled) setIsLoading(false);
    }, 2000);

    (async () => {
      try {
        const raw = await AsyncStorage.getItem(AUTH_KEY);
        if (raw) {
          const stored: StoredAuth = JSON.parse(raw);
          if (stored?.user && typeof stored.token === 'string' && !cancelled) {
            setUser(stored.user);
            setToken(stored.token);
          }
        }
      } catch (_) {}
      clearTimeout(timeout);
      if (!cancelled) setIsLoading(false);
    })();

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  const persist = useCallback(async (u: AuthUser, t: string) => {
    setUser(u);
    setToken(t);
    await AsyncStorage.setItem(AUTH_KEY, JSON.stringify({ user: u, token: t } as StoredAuth));
  }, []);

  const register = useCallback(async (username: string, password: string) => {
    const apiBase = getApiBase();
    if (!apiBase) {
      return { error: 'Serveur non disponible. Vérifie ta connexion.' };
    }
    try {
      const res = await fetch(`${apiBase}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim().toLowerCase(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return { error: data.error ?? 'Erreur lors de l\'inscription' };
      }
      await persist(data.user as AuthUser, data.token as string);
      return {};
    } catch {
      return { error: 'Impossible de contacter le serveur' };
    }
  }, [persist]);

  const login = useCallback(async (username: string, password: string) => {
    const apiBase = getApiBase();
    if (!apiBase) {
      return { error: 'Serveur non disponible. Vérifie ta connexion.' };
    }
    try {
      const res = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim().toLowerCase(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        return { error: data.error ?? 'Identifiant ou mot de passe incorrect' };
      }
      await persist(data.user as AuthUser, data.token as string);
      return {};
    } catch {
      return { error: 'Impossible de contacter le serveur' };
    }
  }, [persist]);

  const logout = useCallback(async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem(AUTH_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
