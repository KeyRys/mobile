import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";

import { logout } from "@/src/services/auth_services";
import { getMyProfile } from "@/src/services/profile_service";
import { becomeSeller } from "@/src/services/seller_service";
import { router } from "expo-router";

export default function ProfileScreen() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [location, setLocation] = useState("");
  const [sellerLoading, setSellerLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const data = await getMyProfile();

      //console.log("PROFILE:", data);

      setProfile(data);
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace("/login");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed logout");
    }
  };

  const handleBecomeSeller = async () => {
    try {
      setSellerLoading(true);

      await becomeSeller(location);

      Alert.alert("Success", "You are now a seller 🎉");
    } catch (err: any) {
      console.log(err);

      Alert.alert(
        "Error",
        err?.response?.data?.error || "Failed become seller"
      );
    } finally {
      setSellerLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

      <Text>Name: {profile?.name}</Text>
      <Text>Phone: {profile?.phone}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}
      >
        <Text style={ styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      {profile?.is_seller && (
        <Text style={styles.sellerBadge}>
          Seller Account Active
        </Text>
      )}
      {profile?.is_seller && (
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/seller/dashboard")}
      >
        <Text style={styles.buttonText}>Seller Dashboard</Text>
      </TouchableOpacity>
    )}

      {!profile?.is_seller && (
        <View style={{ marginTop: 30 }}>
          <Text style={styles.subtitle}>Become Seller</Text>

          <TextInput
            placeholder="Seller location"
            value={location}
            onChangeText={setLocation}
            style={styles.input}
          />

          <Button
            title={sellerLoading ? "Loading..." : "become Seller"}
            onPress={handleBecomeSeller}
            disabled={sellerLoading}
          />
        </View>
      )}
      <TouchableOpacity onPress={() =>router.push("/order")} style={styles.button}>
        <Text style={styles.buttonText}>My Orders</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },

  sellerBadge: {
    marginTop: 10,
    color: "green",
    fontWeight: "bold",
  },

  button: {
    marginTop: 20,
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  
});