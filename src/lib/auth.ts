import { useEffect, useState } from "react";
import { api, setToken, clearToken } from "@/lib/api";

export type Profile = {
  id: string;
  full_name: string | null;
  role: "patient" | "caregiver";
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
};

type AuthUser = {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
};

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("cogniscan_token");
    if (!token) {
      setLoading(false);
      return;
    }
    api.auth
      .verify()
      .then(() => api.auth.getProfile())
      .then((p) => {
        setUser({ id: p.id as string, email: p.email as string, full_name: p.full_name as string, role: p.role as string });
        setProfile(p as unknown as Profile);
      })
      .catch(() => {
        clearToken();
        setUser(null);
        setProfile(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function loadProfile() {
    try {
      const p = await api.auth.getProfile();
      setUser({ id: p.id as string, email: p.email as string, full_name: p.full_name as string, role: p.role as string });
      setProfile(p as unknown as Profile);
    } catch { /* ignore */ }
  }

  async function refreshProfile() {
    await loadProfile();
  }

  return { user, profile, loading, refreshProfile };
}

export async function signIn(email: string, password: string) {
  const { token, user } = await api.auth.signIn(email, password);
  setToken(token);
  return user;
}

export async function signUp(email: string, password: string, full_name: string, role: string) {
  const { token, user } = await api.auth.signUp(email, password, full_name, role);
  setToken(token);
  return user;
}

export async function signOut() {
  clearToken();
  window.location.href = "/";
}
