// ===== Auth Service (src/services/Auth.js) =====
import axios from "axios";

const API_BASE = "https://omniaai.azurewebsites.net/api";

// Separate axios instance for auth calls (prevents interceptor loops)
const authAxios = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
    timeout: 10000,
});

export const login = () => {
    window.location.href = `${API_BASE}/AuthLogin`;
};

export const getSession = async (sessionId) => {
    const res = await authAxios.get(`/AuthSession?sessionId=${sessionId}`);
    return res.data;
};

export const refreshSession = async (sessionId) => {
    const res = await authAxios.get(`/AuthRefresh?sessionId=${sessionId}`);
    return res.data;
};

export const logout = async (sessionId) => {
    // window.location.href = `${API_BASE}/AuthLogout?sessionId=${sessionId}`;
    try {
        const response = await authAxios.get(`${API_BASE}/AuthLogout?sessionId=${sessionId}`);
         return response.data; // returns { message: "Logout successful" }
    } catch (error) {
        throw error?.response?.data || error;
    }
};

// JWT Helper functions
const decodeToken = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch {
        return null;
    }
};

export const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = decodeToken(token);
    if (!decoded?.exp) return true;
    return Date.now() >= decoded.exp * 1000;
};

export const isTokenExpiringSoon = (token) => {
    if (!token) return true;
    const decoded = decodeToken(token);
    if (!decoded?.exp) return true;
    const fiveMinutes = 5 * 60 * 1000;
    return decoded.exp * 1000 - Date.now() < fiveMinutes;
};
