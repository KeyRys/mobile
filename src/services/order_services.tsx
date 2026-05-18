import { api } from "@/src/services/api";

export const getMyOrders = async () => {
    const res = await api.get("/orders/me");

    return res.data;
};

export const getSellerOrders = async () => {
    const res = await api.get("/orders/seller");

    return res.data;
};

export const updateOrderStatus = async (orderId: number, status: string) => {
    const res = await api.put(`/orders/${orderId}`, { status });

    return res.data;
};