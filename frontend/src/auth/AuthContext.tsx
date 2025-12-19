import { createContext, useContext, useState, useMemo, useEffect, useCallback } from "react";
import api, { setToken, isTokenValid, setOnAuthInvalid } from "../api";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AUTH_USER_KEY = "auth_user";

const getStoredUser = (): User | null => {
  const stored = localStorage.getItem(AUTH_USER_KEY);
  return stored ? JSON.parse(stored) : null;
};

const setStoredUser = (user: User | null) => {
  if (user) localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  else localStorage.removeItem(AUTH_USER_KEY);
};

const getValidatedToken = (): string | null => {
  const token = localStorage.getItem("auth_token");
  if (isTokenValid(token)) return token;
  // Clear invalid token from storage
  localStorage.removeItem("auth_token");
  localStorage.removeItem(AUTH_USER_KEY);
  return null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTok] = useState<string | null>(getValidatedToken);
  const [user, setUser] = useState<User | null>(() => (token ? getStoredUser() : null));

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token, firstName, lastName, email: userEmail, roles } = res.data;
      const userData: User = { firstName, lastName, email: userEmail, roles };
      setTok(token);
      setToken(token);
      setUser(userData);
      setStoredUser(userData);
      return true;
    } catch {
      return false;
    }
  };

  const logout = useCallback(() => {
    setTok(null);
    setToken(null);
    setUser(null);
    setStoredUser(null);
  }, []);

  // Register 401 handler to auto-logout on server rejection
  useEffect(() => {
    setOnAuthInvalid(logout);
    return () => setOnAuthInvalid(null);
  }, [logout]);

  const isAuthenticated = useMemo(() => isTokenValid(token), [token]);

  const value = useMemo(
    () => ({ token, user, isAuthenticated, login, logout }),
    [token, user, isAuthenticated, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
