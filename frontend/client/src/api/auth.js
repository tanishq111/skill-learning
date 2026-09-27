import api from "./simple";

export const login = async (email, password) => {
    try {
        const response = await api.post("/auth/login", { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (userData) => {
    try {
        console.log("Registering user with data:", userData);
        const response = await api.post("/auth/register", userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};