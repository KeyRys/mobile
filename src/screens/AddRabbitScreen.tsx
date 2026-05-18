import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

import { useState } from "react";

import { createRabbit } from "@/src/services/seller_service";

import { useRouter } from "expo-router";
import { rabbitGender, rabbitPurpose } from "@/src/types/rabbitVariable";
import { Dropdown } from "react-native-element-dropdown";

export default function AddRabbit() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState<rabbitGender>(rabbitGender.female); 
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [purpose, setPurpose] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    try {

      await createRabbit({
        name,
        breed,
        gender,
        age: Number(age),
        weight: Number(weight),
        color,
        price: Number(price),
        purpose,
        description,
      });
      
      Alert.alert(
        "Success",
        "Rabbit created"
      );

      router.back();

    } catch (err) {
      console.log(err);

      Alert.alert(
        "Error",
        "Failed to create rabbit"
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

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={[
          { label: "Male", value: rabbitGender.male },
          { label: "Female", value: rabbitGender.female },
        ]}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Rabbit Gender"
        value={gender}
        onChange={item => {
          setGender(item.value);
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Number of Months"
        value={age}
        onChangeText={setAge}
        // Opens the numeric keyboard on iOS and Android
        keyboardType="numeric"
        inputMode="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="0.00"
        value={weight}
        onChangeText={setWeight}
        keyboardType="decimal-pad"
      />

      <TextInput
        placeholder="Color"
        style={styles.input}
        value={color}
        onChangeText={setColor}
      />

      <TextInput
        placeholder="Price"
        style={styles.input}
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={[
          { label: "Pet", value: rabbitPurpose.pet },
          { label: "Breeding", value: rabbitPurpose.breeding },
          { label: "Meat", value: rabbitPurpose.meat },
        ]}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Rabbit Purpose"
        value={purpose}
        onChange={item => {
          setPurpose(item.value);
        }}
      />

      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      
      <Pressable
        style={styles.button}
        onPress={handleCreate}
      >
        <Text style={styles.btnText}>
          Create Rabbit
        </Text>
      </Pressable>
      
      <Pressable
        style={styles.button}
        onPress={() => router.push("/seller/dashboard")}
      >
        <Text style={styles.btnText}>
          Go back to Dashboard
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

   dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: { fontSize: 16 },
  selectedTextStyle: { fontSize: 16 },

  button: {
    backgroundColor: "#000",
    padding: 8,
    borderRadius: 10,
    marginBottom: 12,
  },

  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});