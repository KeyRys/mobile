import { api } from "@/src/services/api";

export const becomeSeller = async (location: string) => {
  const res = await api.post("/seller/up", {
    location,
  });

  return res.data;
};

export const getSellerRabbits = async () => {
  const res = await api.get("/seller/rabbits");
  return res.data;
};

export const createRabbit = async (data: any) => {
  const res = await api.post("/seller/rabbits", data);
  return res.data;
};

export const updateRabbit = async (
  id: string,
  data: any
) => {
  const res = await api.put(
    `/seller/rabbits/${id}`,
    data
  );

  return res.data;
};

export const deleteRabbit = async (
  id: string
) => {
  const res = await api.delete(
    `/seller/rabbits/${id}`
  );

  return res.data;
};