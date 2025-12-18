import { createContext, useContext, useState, useMemo } from "react";
import api, { setToken } from "../api";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
};

type AuthContextType = {
  token: string | null;
  user: User | null;
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

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTok] = useState<string | null>(localStorage.getItem("auth_token"));
  const [user, setUser] = useState<User | null>(getStoredUser());

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

  const logout = () => {
    setTok(null);
    setToken(null);
    setUser(null);
    setStoredUser(null);
  };

  const value = useMemo(() => ({ token, user, login, logout }), [token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
