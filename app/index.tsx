import { View, ActivityIndicator} from "react-native";
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

export default function Index() {
  const [ready, setReady] = useState(false);
  
  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      router.replace('/login');
    }
  }, [ready]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator />
    </View>
  );
}
