import { Ionicons } from "@expo/vector-icons";
import { View, Image, Text, StyleSheet, Pressable, Linking } from "react-native";

export default function ProductCard({ product, onPress }: any) {
  return (
    <View style={styles.card}>
      <Pressable style={{flexDirection: "row"}} onPress={() => onPress(product)}>
        
        <Image
          source={require('@/src/assets/logo.png')}
          style={styles.image}
        />

        <View style={styles.content}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.breed}>{product.breed}</Text>
          <Text style={styles.price}>Rp {product.price}</Text>
        </View>
        
        <View style={styles.chatButton}>
          <Pressable onPress={() => {
            const url = `http://wa.me/${product.phone}`;
            Linking.openURL(url);
          }}>
            <Ionicons name="chatbubble-ellipses-outline" size={24} />
            <Text style={{fontSize: 12 }}>Chat</Text>
          </Pressable>
        </View>


      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    maxWidth: 400,
    width: "100%",
    display: "flex",
    backgroundColor: "#fff",
    padding: 12,
    margin: "auto", 
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  content: {
    //width: "18vw",
    width: 200,
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  breed: {
    color: "#666",
    marginVertical: 2,
  },
  price: {
    fontWeight: "600",
    marginBottom: 8,
  },
  chatButton: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});