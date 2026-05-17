import { api } from "@/src/services/api";

export const getMyOrders = async () => {
    const res = await api.get("/orders/me");

    return res.data;
};