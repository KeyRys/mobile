import { api } from "@/src/services/api";

export const registerAuth = async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', {
        name,
        email,
        password
    });
    return response.data;
};