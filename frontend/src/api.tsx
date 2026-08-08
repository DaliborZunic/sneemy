import axios from "axios";
const api = axios.create({
    baseURL: "/api", // your backend proxy target
});
export const getToken = () => localStorage.getItem("auth_token");
export const setToken = (token) => {
    if (token)
        localStorage.setItem("auth_token", token);
    else
        localStorage.removeItem("auth_token");
};
export const isTokenValid = (token) => {
    if (!token)
        return false;
    try {
        const parts = token.split(".");
        if (parts.length !== 3)
            return false;
        const payload = JSON.parse(atob(parts[1]));
        if (!payload.exp)
            return false;
        // exp is in seconds, Date.now() is in milliseconds
        const expirationTime = payload.exp * 1000;
        return Date.now() < expirationTime;
    }
    catch {
        return false;
    }
};
// Callback for when auth becomes invalid (set by AuthContext)
let onAuthInvalid = null;
export const setOnAuthInvalid = (callback) => {
    onAuthInvalid = callback;
};
api.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// Response interceptor to handle 401 (unauthorized) responses
api.interceptors.response.use((response) => response, (error) => {
    if (error.response?.status === 401 && onAuthInvalid) {
        onAuthInvalid();
    }
    return Promise.reject(error);
});
export default api;
