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
import styles from '../styles/register';
import { Routes } from '../route';

export default function Register() {
  const router = useRouter();
  const { register } = useContext(AuthContext);

  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === 'web';
  const formWidth = isWeb ? Math.min(400, width * 0.8) : width * 0.9;

  const handleRegister = async () => {
    setErrorMessage(null);

    // 1) Validar campos
    if (!name.trim() || !phone.trim() || !email.trim() || !password) {
      setErrorMessage('Por favor completa todos los campos.');
      return;
    }

    // 2) Intentar registro
    try {
      await register(name.trim(), phone.trim(), email.trim(), password);
      router.replace(Routes.Home);
    } catch (error: any) {
      let message = 'No se pudo registrar. Verifica los datos.';
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'Este correo ya está en uso.';
          break;
        case 'auth/invalid-email':
          message = 'El formato del correo es inválido.';
          break;
        case 'auth/weak-password':
          message = 'La contraseña debe tener al menos 6 caracteres.';
          break;
        case 'auth/operation-not-allowed':
          message = 'Registro deshabilitado en este momento.';
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
        <Text style={styles.title}>LazosVet</Text>
      </View>

      <Text style={styles.subtitle}>Regístrate para empezar</Text>

      <View style={[styles.form, { width: formWidth, alignSelf: 'center' }]}>
        {/* Error inline */}
        {errorMessage && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}

        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu nombre"
          placeholderTextColor="#999"
          value={name}
          onChangeText={text => {
            setName(text);
            if (errorMessage) setErrorMessage(null);
          }}
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu teléfono"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={text => {
            setPhone(text);
            if (errorMessage) setErrorMessage(null);
          }}
        />

        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu correo"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (errorMessage) setErrorMessage(null);
          }}
        />

        <Text style={styles.label}>Contraseña</Text>
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

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Regístrate</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          ¿Ya tienes cuenta?{' '}
          <Text
            style={styles.registerLink}
            onPress={() => router.push(Routes.Login)}
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
