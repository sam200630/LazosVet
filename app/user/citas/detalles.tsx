import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import styles from '../../../styles/citas/detalles';
import { DatesContext, DateType } from '../../../context/DatesContext';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../utils/FirebaseConfig';
import { AuthContext } from '../../../context/AuthContext';

// Assets
import goBackIcon from '../../../assets/images/goBack.png';
import pawIcon    from '../../../assets/images/mascota.png';
import { Routes } from '../../../route';

export default function DetallesCita() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.id as string;
   const { userType } = useContext(AuthContext);

  const { dates } = useContext(DatesContext);
  const [cita, setCita] = useState<DateType | null>(null);

 useEffect(() => {
  const found = dates.find(d => d.id === id) || null;
  if (found) {
    setCita(found);
  } else {
    // Si no se encuentra localmente, cargar desde Firestore
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'dates', id));
        if (snap.exists()) {
          const data = snap.data();
          setCita({ id: snap.id, ...data } as DateType);
        } else {
          setCita(null);
        }
      } catch (e) {
        console.error(e);
        setCita(null);
      }
    })();
  }
}, [id, dates]);


  const handleConfirm = () => {
    if (userType === 'admin') {
      router.replace(Routes.AdminHome);
    } else {
      router.replace(Routes.Home);
    }
  };

  const handleCancel = async () => {
    try {
      await deleteDoc(doc(db, 'dates', id));
      if (userType === 'admin') {
        router.replace(Routes.AdminHome);
      }
      else {
        router.replace(Routes.Home);
      }
    } catch (e) {
      Alert.alert('Error', 'No se pudo cancelar la cita.');
    }
  };

  if (!cita) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>Cargando detalles...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.goBack} onPress={() => router.back()}>
        <Image source={goBackIcon} style={styles.goBackIcon} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Title with paws */}
        <View style={styles.titleRow}>
          <Image source={pawIcon} style={styles.pawIcon} />
          <Text style={styles.title}>Detalles cita</Text>
          <Image source={pawIcon} style={styles.pawIcon} />
        </View>

        {/* Pet Name */}
        <Text style={styles.petName}>{cita.petName}</Text>

        {/* Motivo */}
        <Text style={styles.label}>Motivo de la cita</Text>
        <View style={styles.fieldBox}>
          <Text style={styles.fieldText}>{cita.reason}</Text>
        </View>

        {/* Notas */}
        <Text style={styles.label}>Recomendaciones adicionales</Text>
        <View style={styles.fieldBox}>
          <Text style={styles.fieldText}>
            {cita.notes || '—'}
          </Text>
        </View>

        {/* Fecha */}
        <Text style={styles.label}>Fecha</Text>
        <View style={styles.fieldBox}>
          <Text style={styles.fieldText}>{cita.date}</Text>
        </View>

        {/* Hora */}
        <Text style={styles.label}>Hora</Text>
        <View style={styles.fieldBox}>
          <Text style={styles.fieldText}>{cita.time}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Cita confirmada</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancelar cita</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
);
}
