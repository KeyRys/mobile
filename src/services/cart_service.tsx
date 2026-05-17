import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/src/services/api";

export const addToCart = async (productId: string) => {
  const token = await AsyncStorage.getItem("token");
  //console.log("TOKEN:", token);
  //console.log("PRODUCT:", productId);

  const res = await api.post("/cart/add", {
    product_id: productId,
  });
  return res.data;
};

export const getCart = async () => {
  const res = await api.get("/cart", {});
  return res.data;
}

export const removeFromCart = async (productId: string) => {
  const res = await api.delete(`/cart/item/${productId}`, {});
  return res.data;
}