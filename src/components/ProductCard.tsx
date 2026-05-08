import { View, Image, Text, StyleSheet, Pressable } from "react-native";

export default function ProductCard({ product, onPress }: any) {
  return (
    <View style={styles.card}>
      <Pressable style={{flexDirection: "row"}} onPress={() => onPress(product)}>
        
        <Image
          source={require('../assets/logo.png')}
          style={styles.image}
        />

        <View style={styles.content}>
          <Text style={styles.title}>{product.name}</Text>
          <Text style={styles.breed}>{product.breed}</Text>
          <Text style={styles.price}>Rp {product.price}</Text>

        </View>

      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 3,
    flexDirection: "row",
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
});