// app/admin/scan.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useRouter } from 'expo-router';
import goBackIcon from '../../assets/images/goBack.png';
import { Image } from 'react-native';

export default function AdminScan() {
  const router = useRouter();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  // Pedir permiso al montar
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    // data debería ser el ID de la cita
    router.replace(`/admin/detalles-cita?id=${data}`);
  };

  if (hasPermission === null) {
    return <ActivityIndicator style={styles.loader} />;
  }
  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <Text>No se concedió acceso a la cámara.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botón atrás */}
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Image source={goBackIcon} style={styles.backIcon} />
      </TouchableOpacity>

      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setScanned(false)}
        >
          <Text style={styles.resetText}>Volver a escanear</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center:    { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loader:    { flex: 1, justifyContent: 'center' },
  back:      { position: 'absolute', top: Platform.OS==='android'? 25: 50, left: 16, zIndex: 10 },
  backIcon:  { width: 24, height: 24 },
  resetButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  resetText: { fontWeight: '600' },
});
