import { api } from "@/src/services/api";

export const loginAuth = async (email: string, password: string) => {
    const response = await api.post('/auth/login', {
        email, password
    });
    const { token } = response.data;
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return response.data; // { token: '...' }
};