import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { AuthState, UserProfile, RegisterFormData, UserRole } from '../types';

const TOKEN_KEY = 'hackorbit_token';
const USER_KEY = 'hackorbit_user';
const API_BASE = 'http://localhost:3000';

interface AuthContextValue extends AuthState {
  isLoading: boolean;
  token: string | null;
  register: (data: RegisterFormData) => Promise<{ success: boolean; error?: string; role?: UserRole }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string; role?: UserRole }>;
  signOut: () => Promise<void>;
  updateUser: (patch: Partial<UserProfile>) => void; 
  registerHackathon: (hackathonId: string) => void;
  bookmarkHackathon: (hackathonId: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Validate session with backend on initial load if token exists
  useEffect(() => {
    async function checkAuth() {
      const savedToken = localStorage.getItem(TOKEN_KEY);
      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${savedToken}` },
          signal: AbortSignal.timeout(3000),
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        } else {
          // Token expired or invalid
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
          setToken(null);
          setUser(null);
        }
      } catch {
        // Backend offline: keep local cached user if available
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  // Register
  const register = useCallback(
    async (data: RegisterFormData): Promise<{ success: boolean; error?: string; role?: UserRole }> => {
      if (data.password !== data.confirmPassword) {
        return { success: false, error: 'Passwords do not match.' };
      }
      if (data.password.length < 8) {
        return { success: false, error: 'Password must be at least 8 characters long.' };
      }

      try {
        const res = await fetch(`${API_BASE}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        const resData = await res.json();
        if (!res.ok) {
          return { success: false, error: resData.error || 'Registration failed.' };
        }

        setToken(resData.token);
        setUser(resData.user);
        localStorage.setItem(TOKEN_KEY, resData.token);
        localStorage.setItem(USER_KEY, JSON.stringify(resData.user));

        return { success: true, role: resData.user.role };
      } catch {
        // Fallback demo local register if backend is offline
        const fallbackUser: UserProfile = data.role === 'student'
          ? {
              id: `usr_${Date.now()}`,
              role: 'student',
              fullName: data.fullName.trim(),
              email: data.email.trim().toLowerCase(),
              college: data.college || 'Engineering Institute',
              course: data.course || 'Computer Science',
              graduationYear: data.graduationYear || '2026',
              skills: data.skills || ['React', 'Python'],
              interests: data.interests || ['AI & ML'],
              experienceLevel: data.experienceLevel || 'beginner',
              photoUrl: data.photoFile ? URL.createObjectURL(data.photoFile) : undefined,
              registeredHackathons: [],
              bookmarkedHackathons: [],
              createdAt: new Date().toISOString(),
            }
          : {
              id: `usr_${Date.now()}`,
              role: 'organizer',
              fullName: data.fullName.trim(),
              email: data.email.trim().toLowerCase(),
              organizationName: data.organizationName || 'Global HackLab',
              organizationType: data.organizationType || 'company',
              roleInOrg: data.roleInOrg || 'Lead Organizer',
              website: data.website || '',
              managedHackathons: ['neuroforge-2026'],
              createdAt: new Date().toISOString(),
            };

        const dummyToken = `demo_tok_${Date.now()}`;
        setToken(dummyToken);
        setUser(fallbackUser);
        localStorage.setItem(TOKEN_KEY, dummyToken);
        localStorage.setItem(USER_KEY, JSON.stringify(fallbackUser));

        return { success: true, role: fallbackUser.role };
      }
    },
    []
  );

  // Sign In
  const signIn = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string; role?: UserRole }> => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim(), password }),
        });

        const resData = await res.json();
        if (!res.ok) {
          return { success: false, error: resData.error || 'Invalid credentials.' };
        }

        setToken(resData.token);
        setUser(resData.user);
        localStorage.setItem(TOKEN_KEY, resData.token);
        localStorage.setItem(USER_KEY, JSON.stringify(resData.user));

        return { success: true, role: resData.user.role };
      } catch {
        // Offline demo fallback helper
        const normalized = email.trim().toLowerCase();
        if (normalized.includes('organizer') || normalized === 'organizer@hackorbit.ai') {
          const orgUser: UserProfile = {
            id: 'usr_organizer_demo',
            role: 'organizer',
            fullName: 'Dr. Sarah Jenkins',
            email: 'organizer@hackorbit.ai',
            organizationName: 'OpenAgent Labs Foundation',
            organizationType: 'nonprofit',
            roleInOrg: 'Director of Developer Programs',
            website: 'https://openagentlabs.org',
            managedHackathons: ['neuroforge-2026', 'orbitsync-mesh'],
            createdAt: new Date().toISOString(),
          };
          const dummyToken = 'demo_org_token';
          setToken(dummyToken);
          setUser(orgUser);
          localStorage.setItem(TOKEN_KEY, dummyToken);
          localStorage.setItem(USER_KEY, JSON.stringify(orgUser));
          return { success: true, role: 'organizer' };
        }

        const studentUser: UserProfile = {
          id: 'usr_student_demo',
          role: 'student',
          fullName: 'Aarav Patel',
          email: normalized || 'student@hackorbit.ai',
          college: 'Indian Institute of Technology, Bombay',
          course: 'B.Tech in Computer Science',
          graduationYear: '2026',
          skills: ['React', 'TypeScript', 'Python', 'AI/ML'],
          interests: ['AI & Machine Learning', 'Distributed Systems'],
          experienceLevel: 'intermediate',
          registeredHackathons: ['neuroforge-2026'],
          bookmarkedHackathons: ['orbitsync-mesh'],
          createdAt: new Date().toISOString(),
        };
        const dummyToken = 'demo_student_token';
        setToken(dummyToken);
        setUser(studentUser);
        localStorage.setItem(TOKEN_KEY, dummyToken);
        localStorage.setItem(USER_KEY, JSON.stringify(studentUser));
        return { success: true, role: 'student' };
      }
    },
    []
  );

  // Sign Out
  const signOut = useCallback(async () => {
    const savedToken = localStorage.getItem(TOKEN_KEY);
    if (savedToken) {
      try {
        await fetch(`${API_BASE}/api/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${savedToken}` },
        });
      } catch {
        // Ignore network errors on signout
      }
    }
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  }, []);

  // Update User
  const updateUser = useCallback((patch: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...patch } as UserProfile;
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Student specific: Register for Hackathon
  const registerHackathon = useCallback((hackathonId: string) => {
    setUser((prev) => {
      if (!prev || prev.role !== 'student') return prev;
      if (prev.registeredHackathons.includes(hackathonId)) return prev;
      const updated: UserProfile = {
        ...prev,
        registeredHackathons: [...prev.registeredHackathons, hackathonId],
      };
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Student specific: Bookmark Hackathon
  const bookmarkHackathon = useCallback((hackathonId: string) => {
    setUser((prev) => {
      if (!prev || prev.role !== 'student') return prev;
      const exists = prev.bookmarkedHackathons.includes(hackathonId);
      const updated: UserProfile = {
        ...prev,
        bookmarkedHackathons: exists
          ? prev.bookmarkedHackathons.filter((id) => id !== hackathonId)
          : [...prev.bookmarkedHackathons, hackathonId],
      };
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user && !!token,
        user,
        token,
        isLoading,
        register,
        signIn,
        signOut,
        updateUser,
        registerHackathon,
        bookmarkHackathon,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
