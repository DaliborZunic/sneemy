import axios from "axios";

const api = axios.create({
  baseURL: "/api", // your backend proxy target
});

export const getToken = () => localStorage.getItem("auth_token");
export const setToken = (token: string | null) => {
  if (token) localStorage.setItem("auth_token", token);
  else localStorage.removeItem("auth_token");
};

api.interceptors.request.use((config: any) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
