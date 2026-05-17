import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "@/src/services/api";

export const logout = async () => {
  // remove token
  await AsyncStorage.removeItem("token");

  // remove axios auth header
  delete api.defaults.headers.common["Authorization"];
};