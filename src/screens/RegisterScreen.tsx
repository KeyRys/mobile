import React, { useState } from 'react';
import {
    Image,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import { router } from 'expo-router';
import { registerAuth } from '@/src/services/register_auth';

type Props = {
    navigation: any;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegister = async () => {
    console.log('Attempting registration with:', { name, email, password });
    if (!name || !email || !password) {
        Alert.alert('Error', 'Please fill all fields');
        return;
    }

    try {
        await registerAuth(name, email, password);
        Alert.alert('Success', 'Account created! Please login');
        router.replace('/login');
    } catch (err: any) {
        Alert.alert(
            'Register Failed',
            err?.response?.data?.error || 'Something went wrong'
        )
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Adorabbit</Text>
        <Image source={require('@/src/assets/logo.png')} style={styles.logo} />
        <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
        />
        <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
        />
        <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/login')}>
            <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
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
        marginTop: 15,
        textAlign: 'center',
        color: '#3498db',
    },
});