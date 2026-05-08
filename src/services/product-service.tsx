import { api } from "@/src/services/api";

export const getProductById = async (id: string) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};