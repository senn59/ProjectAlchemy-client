import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5297/api",
});

api.defaults.headers.common["Content-Type"] = "application/json";
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth-jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
