import api from "./simple";

// The interceptor already unwraps these into { ok, status, data } / { ok, status, error }.
export const login = (email, password) =>
    api.post("/auth/login", { email, password });

export const register = (userData) => api.post("/auth/register", userData);

export const logout = () => api.post("/auth/logout");

export const getMe = () => api.get("/me");