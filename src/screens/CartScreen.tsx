import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";

import { getCart, removeFromCart } from "@/src/services/cart_service";
import { checkout } from "../services/checkout_services";

export default function CartScreen() {

  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      //console.log("CART DATA:", data);
      setItems(data);

    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    console.log("Remove item:", itemId);
    try {
        await removeFromCart(itemId);
        console.log("Item removed successfully");
        fetchCart();
    } catch (err) {
        console.log("Failed to remove item:", err);
    }
  }
  
  const handleCheckout = async () => {
    try {
      const res = await checkout();
      console.log("Checkout successful:", res);
    } catch (err: any) {
      console.log("Checkout failed:", err.response?.data );
    }
  };

  return (
    <View style={styles.container}>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <View style={styles.card}>

            <Image
              source={require('@/src/assets/logo.png')}
              style={styles.image}
            />

            <View style={styles.content}>
              <Text style={styles.title}>
                {item.product.name}
              </Text>
              <Text>Breed: {item.product.breed}</Text>
              <Text>Rp {item.product.price}</Text>
            </View>

            <View style={styles.removeBtn}>
              <Ionicons name="trash-outline" size={24}>
                <Pressable onPress={() => handleRemoveItem(item.id)}>
                  <Text style={{fontSize: 12, marginLeft : -8}}>Remove</Text>
                </Pressable>
              </Ionicons>
            </View>

          </View>
        )}
      />
      <Pressable style={styles.checkoutButton} onPress={() => handleCheckout()}>
        <Text style={styles.buttonText}>Checkout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 16,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
  },

  checkoutButton: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    alignContent: "center",
    textAlign: "center",
  },
  removeBtn:{
    flex: .1,
    alignItems: "center",
    justifyContent: "center",
  },
  content:{
    width: 100,
    flex: 1,
    marginLeft: 12,
  }
});