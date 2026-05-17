import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";

import { useEffect, useState } from "react";

import {
  getSellerRabbits,
  deleteRabbit,
} from "@/src/services/seller_service";

import { useRouter } from "expo-router";

export default function SellerDashboard() {

  const router = useRouter();

  const [rabbits, setRabbits] = useState<any[]>([]);
  
  const fetchRabbits = async () => {
    try {
      const data = await getSellerRabbits();
      console.log("Seller rabbits:", data);
      setRabbits(data);
    } catch (err) {
      console.log(err);
      console.log("data:", rabbits);
    }
  };

  useEffect(() => {
    fetchRabbits();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteRabbit(id);

      Alert.alert("Success", "Rabbit deleted");

      fetchRabbits();

    } catch (err) {
      console.log(err);

      Alert.alert("Error", "Delete failed");
    }
  };

  return (
    
    <View style={styles.container}>
      <FlatList
        data={rabbits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[item.health_status === "healthy" ? { borderColor: "#3cff00ff" } : {borderColor: "#da0000ff"}, styles.card]}>
            <Text style={styles.title}>
              {item.name}
            </Text>

            <Text>{item.breed}</Text>

            <Text>
              Rp {item.price}
            </Text>

            <View style={styles.row}>

              <Pressable
                style={styles.editBtn}
                onPress={() =>
                  router.push({
                    pathname: "/seller/edit_rabbit",
                    params: {
                      id: item.id,
                    },
                  })
                }
              >
                <Text>Edit</Text>
              </Pressable>

              <Pressable
                style={styles.deleteBtn}
                onPress={() =>
                  handleDelete(item.id)
                }
              >
                <Text>Delete</Text>
              </Pressable>

            </View>

          </View>
        )}
      />
      <Pressable
        style={styles.createBtn}
        onPress={() => router.push("/seller/add_rabbit")}
      >
        <Text style={styles.btnText}>
          + Add Rabbit
        </Text>
      </Pressable>
      
      <Pressable
        style={styles.createBtn}
        onPress={() => router.replace("/home")}
      >
        <Text style={styles.btnText}>
          Back to Home
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  createBtn: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#ffffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    borderWidth: 1,
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
  },

  row: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },

  editBtn: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 8,
  },

  deleteBtn: {
    backgroundColor: "#ffcccc",
    padding: 10,
    borderRadius: 8,
  },
});