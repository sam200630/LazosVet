// app/citas/qr.tsx

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { BlurView } from 'expo-blur';
import styles from '../../../styles/citas/qr';
import { Routes } from '../../../route';
import goBackIcon from '../../../assets/images/goBack.png';

import QRCode from 'react-native-qrcode-svg';   // ← CAMBIO: importamos el componente QR
import { doc, getDoc } from 'firebase/firestore'; // ← CAMBIO: para leer la cita
import { db } from '../../../utils/FirebaseConfig';
import { DateType } from '../../../context/DatesContext';

export default function QR() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();      // ← CAMBIO: leemos el parámetro
  const [cita, setCita] = useState<DateType | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      // ← CAMBIO: obtenemos la cita de Firestore
      const snap = await getDoc(doc(db, 'dates', id));
      if (snap.exists()) {
        const data = snap.data();
        setCita({ id: snap.id, ...data } as DateType);
      }
    })();
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <BlurView intensity={80} tint="light" style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.box}>
          <View style={styles.placeholderQR}>
            {/* ← CAMBIO: pintamos el QR sólo cuando tengamos el id */}
            {id ? (
              <QRCode
                value={id}    // aquí puedes usar `JSON.stringify(cita)` o un deep-link
                size={200}
              />
            ) : (
              <Text style={styles.placeholderText}>Cargando QR…</Text>
            )}
          </View>

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
