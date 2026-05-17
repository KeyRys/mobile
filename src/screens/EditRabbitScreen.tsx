import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import { useEffect, useState } from "react";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import {
  getSellerRabbits,
  updateRabbit,
} from "@/src/services/seller_service";

import { getProductById } from "@/src/services/product_service";


import { rabbitHealth } from "@/src/types/rabbitVariable";
import { Dropdown } from "react-native-element-dropdown";

export default function EditRabbit() {

  const router = useRouter();

  const { id } = useLocalSearchParams();

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [healthStatus, setHealthStatus] = useState("");

  const fetchRabbit = async () => {
    try {
      //console.log("Fetching rabbit with ID:", id);
      
      const data = await getProductById(
        id as string
      );
      //console.log("Seller rabbits:", data);
      setName(data.name);
      setBreed(data.breed);
      setPrice(String(data.price));
      setDescription(data.description);
      setHealthStatus(data.healthStatus);

    } catch (err) {
      console.log(err);

      Alert.alert(
        "Error",
        "Failed to fetch rabbit"
      );
    }
  };

  useEffect(() => {
    fetchRabbit();
  }, []);

  const handleUpdate = async () => {
    try {

      await updateRabbit(
        id as string,
        {
          name,
          breed,
          price: Number(price),
          description,
          healthStatus,
        }
      );

      Alert.alert(
        "Success",
        "Rabbit updated"
      );

      router.back();

    } catch (err) {
      console.log(err);

      Alert.alert(
        "Error",
        "Failed to update rabbit"
      );
    }
  };

  return (
    <View style={styles.container}>

      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Breed"
        style={styles.input}
        value={breed}
        onChangeText={setBreed}
      />

      <TextInput
        placeholder="Price"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <TextInput
        placeholder="Description"
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={[
          { label: "Healthy", value: rabbitHealth.healthy },
          { label: "Sick", value: rabbitHealth.sick }
        ]}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder= "Health Status : "
        value={healthStatus}
        onChange={item => {
          setHealthStatus(item.value);
        }}
      />

      <Pressable
        style={styles.button}
        onPress={handleUpdate}
      >
        <Text style={styles.btnText}>
          Update Rabbit
        </Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: "gray", marginTop: 10 }]}
        onPress={() => router.back()}
      >
        <Text style={styles.btnText}>
          Cancel
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

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 10,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: { fontSize: 16 },
  selectedTextStyle: { fontSize: 16 },
});