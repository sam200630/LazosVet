import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import styles from '../../styles/citas/qr';
import { Routes } from '../../route';

// Icono de cerrar (igual al de GoBack)
import goBackIcon from '../../assets/images/goBack.png';

export default function QR() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Desenfoque total del fondo */}
      <BlurView intensity={80} tint="light" style={styles.overlay} />

      {/* 2. Contenido centrado */}
      <View style={styles.content}>
        <View style={styles.box}>
          {/* Placeholder para tu código QR */}
          <View style={styles.placeholderQR}>
            <Text style={styles.placeholderText}>[ Aquí irá el QR ]</Text>
          </View>

          {/* Botón Cerrar / Volver a Home */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace(Routes.Home)}
          >
            <Image source={goBackIcon} style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
