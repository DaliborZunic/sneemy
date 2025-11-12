import { createContext, useContext, useState, useMemo } from "react";
import api, { setToken } from "../api";

type AuthContextType = {
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setTok] = useState<string | null>(localStorage.getItem("auth_token"));

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;
      setTok(token);
      setToken(token);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setTok(null);
    setToken(null);
  };

  const value = useMemo(() => ({ token, login, logout }), [token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
