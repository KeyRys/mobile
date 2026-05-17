import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {

  return (
    <Tabs>

      <Tabs.Screen
        name="home"
        options={{
          title: "Home",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="cart"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",

          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person"
              color={color}
              size={size}
            />
          ),
        }}
        
      />

      <Tabs.Screen
        name="order"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}