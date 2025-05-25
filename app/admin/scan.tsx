// app/admin/scan.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Image,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import goBackIcon from '../../assets/images/goBack.png';

export default function AdminScan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const router = useRouter();
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!scanned) {
      setScanned(true);
      router.replace(`/admin/detallesCitaQR?id=${data}`);
    }
  };

  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#30C5FF" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>No se concedió acceso a la cámara.</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.permissionText}>Conceder permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Image source={goBackIcon} style={styles.backIcon} />
      </TouchableOpacity>

      <CameraView
        style={StyleSheet.absoluteFillObject}
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
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
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  back: { position: 'absolute', top: Platform.OS === 'android' ? 25 : 50, left: 16, zIndex: 10 },
  backIcon: { width: 24, height: 24 },
  resetButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    padding: 12,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  resetText: { fontWeight: '600' },
  permissionButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#30C5FF',
    borderRadius: 8,
  },
  permissionText: {
    color: '#fff',
    fontWeight: '600',
  },
});
