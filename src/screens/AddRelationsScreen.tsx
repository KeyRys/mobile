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
  addRelation,
  getRabbitRelation
} from "@/src/services/seller_service";

import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

export default function AddRelationScr() {
    type Relation = {
    parent_name: string;
    child_name: string;
    };
  const router = useRouter();

  const [relations, setRelations] = useState<Relation[]>([]);
  const [selectedParent, setSelectedParent] = useState("");
  const [selectedchild, setSelectedChild] = useState("");
  const [rabbits, setRabbits] = useState<any[]>([]);
  
  const fetchRabbits = async () => {
    try {
      const data = await getSellerRabbits();
      console.log("Seller rabbits:", data);
      setRabbits(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRelations = async() => {
    try {
      const data = await getRabbitRelation();
      console.log("Relations:", data);
      setRelations(data);
    } catch (err) {
      console.log(err);
      console.log("data:", rabbits);
    }
  }
  useEffect(() => {
    //fetchRabbits();
    fetchRelations();
  }, []);

  const handleAddParent = async () => {
    if (selectedParent === selectedchild){
        console.log("Cannot select same rabbit");
    }
    console.log(selectedParent);
    console.log(selectedchild);
    await addRelation(selectedParent, selectedchild);
  }

  return (
    
    <View style={styles.container}>
        <FlatList
            data={relations}

            keyExtractor={(
                item,
                index
            ) => index.toString()}

            renderItem={({ item }) => (

                <View
                style={{
                    borderWidth: 1,
                    padding: 15,
                    marginBottom: 10,
                    borderRadius: 10, 
                }}
                >

                <Text>
                    Parent:
                    {" "}
                    {item.parent_name}
                </Text>

                <Text>
                    Child:
                    {" "}
                    {item.child_name}
                </Text>

                </View>

            )}
            />
       <Text>
            Select Child Rabbit
        </Text>

        <Picker
            selectedValue={selectedchild}
            onValueChange={(value) => setSelectedChild(value)}
        >
            <Picker.Item
                label="Choose Child Rabbit"
                value=""
            />
            {rabbits.map((rabbit: any) => (
                <Picker.Item
                    key={rabbit.id}
                    label={rabbit.name}
                    value={rabbit.id}
                />
            ))}
        </Picker>
        <Picker
            selectedValue={selectedParent}
            onValueChange={(value) => setSelectedParent(value)}
        >
            <Picker.Item
                label="Choose Parent Rabbit"
                value=""
            />
            {rabbits.filter((rabbit:any) => rabbit.id !== selectedchild).map((rabbit: any) => (
                <Picker.Item
                    key={rabbit.id}
                    label={rabbit.name}
                    value={rabbit.id}
                />
            ))}
        </Picker>
      <Pressable
        style={styles.createBtn}
        onPress={handleAddParent}
      >
        <Text style={styles.btnText}>
          Create Parent Relations
        </Text>
      </Pressable>
      
      <Pressable
        style={styles.createBtn}
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