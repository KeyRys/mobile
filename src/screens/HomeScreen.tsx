import { useEffect, useState } from "react";
import { Image, Modal, View, Text, FlatList, StyleSheet, Pressable, TouchableWithoutFeedback, Alert } from "react-native";
import { api } from "@/src/services/api";
import { getProductById } from "@/src/services/product-service";
import ProductCard from "@/src/components/ProductCard";
import { addToCart } from "@/src/services/cart-service";

interface Product {
  id: string;
  title: string;
  breed: string;
  weight: number;
  color: string;
  gender: string
  price: number;
}

const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log("ERROR FETCH PRODUCTS:", err);
    }
  };

  const handleProductPress = async (product: Product) => {
    try {
      setLoadingDetail(true);
      setModalVisible(true);

      const fullData = await getProductById(product.id);
      setSelectedProduct(fullData);

    } catch (err) {
      console.log("DETAIL ERROR:", err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleCartPress = async () => {
    console.log("Adding to cart:", selectedProduct);
    //console.log("TOKEN:", api.defaults.headers.common["Authorization"]);
    try {
      await addToCart(selectedProduct!.id);

      Alert.alert("Success", "Added to cart 🛒");
    } catch (err: any) {
      console.log("ADD TO CART ERROR:", err);

      Alert.alert("Error", "Failed to add to cart");
    }
  };

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
                    <Text style={styles.title}>{selectedProduct.title}</Text>
                    <Text>Price: Rp {selectedProduct.price}</Text>
                    <Text>Breed: {selectedProduct.breed}</Text>
                    <Text>Color: {selectedProduct.color}</Text>
                    <Text>Weight: {selectedProduct.weight}</Text>
                    <Text>Gender: {selectedProduct.gender}</Text>
                    <Text>Price: Rp {selectedProduct.price}</Text>
                    
                    <Pressable onPress={ handleCartPress }>
                      <Text style={{ color: "green", marginTop: 10 }}>Add to Cart</Text>
                    </Pressable>

                    <Pressable onPress={() => setModalVisible(false)}>
                      <Text style={{ color: "blue", marginTop: 10 }}>Close</Text>
                    </Pressable>
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
});