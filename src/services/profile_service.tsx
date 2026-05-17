import { api } from "@/src/services/api";

export const getMyProfile = async () => {
    const res = await api.get("/profile/me", {});
    return res.data;
};