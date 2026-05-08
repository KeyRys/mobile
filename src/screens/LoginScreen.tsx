import React, { useState } from 'react';
import {
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginAuth } from '../services/login-auth';

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    if (!email || !password) {
        console.log('Attempting login with:', { email, password });
      Alert.alert('Error', 'Email and password are required');
      return;
    }

    try {
      setLoading(true);

      // 🔥 Call backend API
      const res = await loginAuth(email, password);

      const token = res.token;

      // ✅ Save JWT locally
      await AsyncStorage.setItem('token', token);

      // ✅ Navigate to home
      router.replace('../home');

    } catch (err: any) {
      console.log('LOGIN ERROR:', err?.response?.data || err.message);

      Alert.alert(
        'Login Failed',
        err?.response?.data?.error || 'Invalid credentials or server error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Adorabbit</Text>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        {/* Email */}
        <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
        />

      {/* Password */}
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Navigate to Register */}
      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.link}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        marginBottom: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        alignSelf: 'center',
        marginBottom: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 14,
        marginBottom: 15,
        borderRadius: 25,
        shadowColor: '#252525ff',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 3,
    },
    button: {
        backgroundColor: '#9dafbbff',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        shadowColor: '#252525ff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: .75,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: '#ffffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    link: {
        marginTop: 20,
        textAlign: 'center',
        color: '#3498db',
    },
});