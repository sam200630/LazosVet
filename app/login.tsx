import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Routes } from '../route';
import styles from '../styles/login';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  // 80% del ancho en web (hasta 400px), 90% en móvil
  const formWidth = isWeb ? Math.min(400, width * 0.8) : width * 0.9;

  const handleLogin = () => {
    console.log('Usuario:', username, 'Password:', password);
    router.replace(Routes.Home);
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

      <Text style={styles.subtitle}>Iniciar sesión</Text>

      <View style={[styles.form, { width: formWidth }]}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu usuario"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
        />

        <Text style={[styles.label, { marginTop: 16 }]}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          No tienes cuenta?{' '}
          <Text
            style={styles.registerLink}
            onPress={() => router.push(Routes.Register)}
          >
            ¡Regístrate!
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
