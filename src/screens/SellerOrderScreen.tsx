import {
  View,
  Text,
  FlatList,
  Pressable,
  RefreshControl,
} from "react-native";

import { useEffect, useState, } from "react";

import { getSellerOrders, updateOrderStatus, } from "@/src/services/order_services";

export default function SellerOrdersScreen() {

  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
        const data = await getSellerOrders();
        setOrders(data);
        console.log("Seller Orders:", data);
    } catch (err) {
        console.log("SELLER ORDER ERROR:", err);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchOrders();
    } catch (err) {
      console.log(err);
    } finally {
      setRefreshing(false);
    }
  };

  const handleUpdateStatus = async (orderID: number, status: string) => {
      try {
        await updateOrderStatus(orderID,status,);
        fetchOrders()
      } catch (err) {
        console.log("UPDATE ERROR:",err,);
      }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20,}}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20, }}>
        Seller Orders
      </Text>

      <FlatList
        data={orders}
        keyExtractor={(item: any) => item.order_id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        renderItem={({ item }: any) => (
          <View
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 10,
              padding: 15,
              marginBottom: 15,
            }}
          >

            <Text>Buyer:{" "}{item.buyer_name}</Text>

            <Text>
              Rabbit:
              {" "}
              {item.rabbit_name}
            </Text>

            <Text>
              Rp {item.price}
            </Text>

            <Text>
              Status:
              {" "}
              {item.status}
            </Text>

            {/* ===================== */}
            {/* ACTION BUTTONS */}
            {/* ===================== */}

            {item.status ===
              "pending" && (

              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                  gap: 10,
                }}
              >

                <Pressable
                  onPress={() => handleUpdateStatus( item.order_id, "accepted",)}

                  style={{
                    backgroundColor: "green",
                    padding: 10,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ color: "white", }}>
                    Accept
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() =>handleUpdateStatus(item.order_id,"rejected",)}
                  style={{
                    backgroundColor: "red",
                    padding: 10,
                    borderRadius: 8,
                  }}
                >

                  <Text style={{  color: "white",}}>
                    Reject
                  </Text>

                </Pressable>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}