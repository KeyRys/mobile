import { startTransition, useEffect, useState } from "react";
import { Image, Modal, View, Text, FlatList, StyleSheet, Pressable, TouchableWithoutFeedback, Alert, RefreshControl } from "react-native";
import { api } from "@/src/services/api";
import { getProductById } from "@/src/services/product_service";
import { router } from "expo-router";
import ProductCard from "@/src/components/ProductCard";
import { addToCart } from "@/src/services/cart_service";
import { getRecentRabbits, saveRecentRabbit } from "../services/recentRabbit";
import { getRecommendations } from "../services/recommendation";

interface Product {
  id: string;
  name: string;
  breed: string;
  weight: number;
  color: string;
  gender: string
  price: number;
  age: number;
  purpose: string;
  health_status: string;
}

const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [recommended, setRecommended] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log("ERROR FETCH PRODUCTS:", err);
    }
  };

  const loadRabbitDetail = async (rabbit: Product) => {
    try {
      setLoadingDetail(true);

      // fetch latest detail
      const detail = await getProductById(rabbit.id);
      console.log("Rabbit Detail:", detail);

      // save clicked rabbit
      await saveRecentRabbit(detail);

      // get latest viewed rabbits
      const recentRabbits = await getRecentRabbits();
      console.log("Recent Rabbits:", recentRabbits);

      // run recommendation
      const recommendations = getRecommendations(recentRabbits, products);
      console.log("Recommendations:", recommendations);

      // update modal data
      setSelectedProduct(detail);

      setRecommended(recommendations.slice(0, 3));
    } catch (err) {
        console.log("DETAIL ERROR:",err);
    } finally {
        setLoadingDetail(false);
    }
  };
  const handleProductPress = async ( rabbit: Product ) => {
    setModalVisible(true);

    await loadRabbitDetail(rabbit);
  };

  const handleCartPress = async () => {
    //console.log("Adding to cart:", selectedProduct);
    //console.log("TOKEN:", api.defaults.headers.common["Authorization"]);
    try {
      await addToCart(selectedProduct!.id);
      console.log("Added to cart successfully");
      Alert.alert("Success", "Added to cart 🛒");
      startTransition(() => {
        setModalVisible(false);
        router.push("/cart");
      });
    } catch (err: any) {
      console.log("Already inside cart");

      Alert.alert("Error", "Failed to add to cart");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProducts();
    setRefreshing(false);
  }

  useEffect(() => {
    fetchProducts();
  }, []);


  const renderItem = ({ item }: {
    item: Product }) => <ProductCard
      product={item}
      onPress={handleProductPress}
      />;

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {loadingDetail ? (
                  <Text>Loading...</Text>
                ) : selectedProduct ? (
                  <>
                    <Image
                      source={require('../assets/logo.png')}
                    />
                    <Text style={styles.title}>{selectedProduct.name}</Text>
                    <Text>Breed: {selectedProduct.breed}</Text>
                    <Text>Color: {selectedProduct.color}</Text>
                    <Text>Age: {selectedProduct.age}</Text>
                    <Text>Weight: {selectedProduct.weight}</Text>
                    <Text>Gender: {selectedProduct.gender}</Text>
                    <Text>Price: Rp {selectedProduct.price}</Text>
                    <Text>Health Status: {selectedProduct.health_status}</Text>

                    <Pressable onPress={ handleCartPress }>
                      <Text style={{ color: "green", marginTop: 10 }}>Add to Cart</Text>
                    </Pressable>
                    
                    <Text style={{ marginTop: 20, fontWeight: "bold" }}>Recommended for you:</Text>

                    {recommended.map((rabbit) => (
                    <Pressable
                      key={rabbit.id}
                      style={styles.recommendationCard}
                      onPress={() => loadRabbitDetail(rabbit)}>
                      <Text>{rabbit.name}</Text>
                      <Text>{rabbit.breed}</Text>
                      <Text>Rp {rabbit.price}</Text>
                    </Pressable>

                  ))}
                  </>
                ) : null}
            </View>
         </View>
        </TouchableWithoutFeedback>
        
      </Modal>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  recommendationCard: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
});