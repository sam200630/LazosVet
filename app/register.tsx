import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/register';

export default function Register() {
  const router = useRouter();
  const { register } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const formWidth = isWeb ? Math.min(400, width * 0.8) : width * 0.9;

  const handleRegister = async () => {
    try {
      await register(name, phone, email, password);
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar. Verifica los datos.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Image
        source={require('../assets/images/huellasInicio.png')}
        style={styles.huellasInicio}
        resizeMode="contain"
      />

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>azosVet</Text>
      </View>

      <Text style={styles.subtitle}>Regístrate para empezar</Text>

      <View style={[styles.form, { width: formWidth }]}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu nombre"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu teléfono"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu correo"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Regístrate</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Ya tienes cuenta?{' '}
          <Text
            style={styles.registerLink}
            onPress={() => router.push('/login')}
          >
            Inicia sesión
          </Text>
        </Text>
      </View>

      <Image
        source={require('../assets/images/huellaGrande.png')}
        style={styles.huellaGrande}
        resizeMode="contain"
      />
    </KeyboardAvoidingView>
  );
}
