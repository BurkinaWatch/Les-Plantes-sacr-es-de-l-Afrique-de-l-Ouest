import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

const AUTH_USER_KEY = '@animaux_sacres_auth_user';
const ACCOUNTS_KEY = '@animaux_sacres_accounts';

interface AuthUser {
  id: number;
  username: string;
}

interface StoredAccount {
  id: number;
  username: string;
  password: string;
  createdAt: string;
}

type AccountsMap = Record<string, StoredAccount>;

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  register: (username: string, password: string) => Promise<{ error?: string }>;
  login: (username: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function getAccounts(): Promise<AccountsMap> {
  try {
    const raw = await AsyncStorage.getItem(ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

async function saveAccounts(accounts: AccountsMap): Promise<void> {
  await AsyncStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function makeToken(id: number, username: string): string {
  const raw = `${id}:${username}:${Date.now()}`;
  return raw.split('').map((c) => c.charCodeAt(0).toString(16).padStart(2, '0')).join('');
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const storedUser = await AsyncStorage.getItem(AUTH_USER_KEY);
        if (storedUser) {
          const parsed: AuthUser = JSON.parse(storedUser);
          setUser(parsed);
          setToken(makeToken(parsed.id, parsed.username));
        }
      } catch (_) {}
      setIsLoading(false);
    })();
  }, []);

  const persist = useCallback(async (u: AuthUser) => {
    const t = makeToken(u.id, u.username);
    setToken(t);
    setUser(u);
    await AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(u));
  }, []);

  const register = useCallback(async (username: string, password: string) => {
    const trimmed = username.trim().toLowerCase();

    if (!/^[a-zA-Z0-9_]{3,30}$/.test(trimmed)) {
      return { error: 'Identifiant invalide (3-30 caractères, lettres, chiffres et _ uniquement)' };
    }
    if (password.length < 6) {
      return { error: 'Le mot de passe doit contenir au moins 6 caractères' };
    }

    const accounts = await getAccounts();

    if (accounts[trimmed]) {
      return { error: 'Cet identifiant est déjà utilisé' };
    }

    const id = Date.now();
    const newAccount: StoredAccount = {
      id,
      username: trimmed,
      password,
      createdAt: new Date().toISOString(),
    };

    accounts[trimmed] = newAccount;
    await saveAccounts(accounts);

    const u: AuthUser = { id, username: trimmed };
    await persist(u);
    return {};
  }, [persist]);

  const login = useCallback(async (username: string, password: string) => {
    const trimmed = username.trim().toLowerCase();
    const accounts = await getAccounts();
    const account = accounts[trimmed];

    if (!account) {
      return { error: 'Identifiant ou mot de passe incorrect' };
    }
    if (account.password !== password) {
      return { error: 'Identifiant ou mot de passe incorrect' };
    }

    const u: AuthUser = { id: account.id, username: account.username };
    await persist(u);
    return {};
  }, [persist]);

  const logout = useCallback(async () => {
    setToken(null);
    setUser(null);
    await AsyncStorage.removeItem(AUTH_USER_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
