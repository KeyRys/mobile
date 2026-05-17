import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getMyOrders } from "@/src/services/order_services";

export default function OrderScreen() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const data = await getMyOrders();
            setOrders(data);
            console.log("Fetched Orders:", data);
        } catch (err: any) {
            console.log("ORDER ERROR:", err );
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item: any) =>
            item.id
        }

        renderItem={({ item }) => (
            <View style={styles.card}>
                <View style={styles.card}>

                <Text>
                    {item.rabbit_name}
                </Text>

                <Text>
                    Rp {item.price}
                </Text>

                <Text>
                    Status: {item.status}
                </Text>
                </View>
            </View>
        )}
        />
    </View>
  );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
  });