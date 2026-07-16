import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { apiFetch, clearAuthTokens, getAuthTokens, setAuthTokens } from '@/lib/api';

const AuthContext = createContext(null);

const readStoredUser = () => {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem('lush_user');
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStoredUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const hydrate = async () => {
      const { accessToken, refreshToken } = getAuthTokens();
      if (!accessToken && !refreshToken) {
        if (active) setLoading(false);
        return;
      }

      try {
        const me = await apiFetch('/api/auth/me', { token: accessToken });
        if (!active) return;
        setUser(me);
        localStorage.setItem('lush_user', JSON.stringify(me));
      } catch {
        try {
          const refreshed = await apiFetch('/api/auth/refresh', {
            method: 'POST',
            token: refreshToken,
          });
          setAuthTokens(refreshed);
          localStorage.setItem('lush_user', JSON.stringify(refreshed.user));
          if (active) setUser(refreshed.user);
        } catch {
          clearAuthTokens();
          localStorage.removeItem('lush_user');
          if (active) setUser(null);
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    hydrate();

    return () => {
      active = false;
    };
  }, []);

  const login = async (email, password) => {
    const result = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    setAuthTokens(result);
    setUser(result.user);
    localStorage.setItem('lush_user', JSON.stringify(result.user));
    return result.user;
  };

  const logout = async () => {
    try {
      const { accessToken } = getAuthTokens();
      if (accessToken) {
        await apiFetch('/api/auth/logout', {
          method: 'POST',
          token: accessToken,
        });
      }
    } catch {
      // ignore logout errors
    } finally {
      clearAuthTokens();
      localStorage.removeItem('lush_user');
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

export function RequireAuth({ allowedRoles = [], children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white text-[#6b6760] font-display tracking-[0.3em] uppercase text-[11px]">
        Loading
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
