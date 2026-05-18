import { api } from "@/src/services/api";

export const getMyProfile = async () => {
    const res = await api.get("/profile/me", {});
    return res.data;
};

export const updateProfile = async (phone: string, address: string) => {
    const res = await api.put("/profile", {phone, address});
    return res.data;
}