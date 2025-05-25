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
} from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '../context/AuthContext';
import styles from '../styles/login';
import { Routes } from '../route';

export default function Login() {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [username, setUsername]         = useState('');
  const [password, setPassword]         = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { width } = useWindowDimensions();
  const isWeb     = Platform.OS === 'web';
  const formWidth = isWeb ? Math.min(400, width * 0.8) : width * 0.9;

  const handleLogin = async () => {
    setErrorMessage(null);

    if (!username.trim() || !password) {
      setErrorMessage('Por favor completa todos los campos.');
      return;
    }

    // Redirigir administrador sin Firebase
    if (username.trim().toLowerCase() === 'admin' && password === '12345') {
      router.replace(Routes.admin);
      return;
    }

    try {
      await login(username.trim(), password);
      router.replace(Routes.Home);
    } catch (error: any) {
      let message = 'Correo o contraseña inválidos.';
      switch (error.code) {
        case 'auth/user-not-found':
          message = 'Usuario no encontrado.';
          break;
        case 'auth/wrong-password':
          message = 'Contraseña incorrecta.';
          break;
        case 'auth/invalid-email':
          message = 'El formato del correo es inválido.';
          break;
        case 'auth/too-many-requests':
          message = 'Demasiados intentos. Intenta más tarde.';
          break;
      }
      setErrorMessage(message);
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

      <Text style={styles.subtitle}>Iniciar sesión</Text>

      <View style={[styles.form, { width: formWidth }]}>
        {/* Mensaje de error inline */}
        {errorMessage && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}

        <Text style={styles.label}>Usuario</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu usuario"
          placeholderTextColor="#999"
          value={username}
          onChangeText={text => {
            setUsername(text);
            if (errorMessage) setErrorMessage(null);
          }}
        />

        <Text style={[styles.label, { marginTop: 16 }]}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={text => {
            setPassword(text);
            if (errorMessage) setErrorMessage(null);
          }}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          ¿No tienes cuenta?{' '}
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
