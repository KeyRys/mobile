import { api } from "@/src/services/api";

export const checkout = async () => {
  const res = await api.post("/checkout");
  return res.data;
};