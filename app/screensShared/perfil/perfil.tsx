// app/perfil/perfil.tsx

import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../../styles/perfil/perfil';
import { CameraModal } from '../../../components/CameraModal';
import { AuthContext } from '../../../context/AuthContext';
import { ProfileContext } from '../../../context/ProfileContext';
import { PetsContext, Pet } from '../../../context/PetsContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db } from '../../../utils/FirebaseConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

import goBackIcon   from '../../../assets/images/goBack.png';
import personaIcon  from '../../../assets/images/persona.png';
import correoIcon   from '../../../assets/images/correo.png';
import pawSmallIcon from '../../../assets/images/mascota.png';
import editIcon     from '../../../assets/images/editar.png';
import trashIcon    from '../../../assets/images/basura.png';
import homeIcon     from '../../../assets/images/home.png';
import petbotIcon   from '../../../assets/images/petbot.png';
import mediaIcon    from '../../../assets/images/media.png';
import perfilIcon   from '../../../assets/images/perfil.png';
import { Routes } from '../../../route';

export default function Perfil() {
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  const { name, email, photoUrl, loading, refreshProfile } = useContext(ProfileContext);
  const { pets } = useContext(PetsContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [uploading, setUploading]       = useState(false);

  // Sube foto...
  const uploadToStorage = async (localUri: string) => {
    try {
      setUploading(true);
      const resp = await fetch(localUri);
      const blob = await resp.blob();
      const storage = getStorage();
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error('Usuario no autenticado');
      const storageRef = ref(storage, `profiles/${uid}/profile.jpg`);
      await uploadBytes(storageRef, blob);
      const downloadUrl = await getDownloadURL(storageRef);
      await updateDoc(doc(db, 'users', uid), { photoUrl: downloadUrl });
      await refreshProfile();
    } catch {
      Alert.alert('Error', 'No se pudo subir la imagen.');
    } finally {
      setUploading(false);
      setModalVisible(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace(Routes.Login);
    } catch {
      Alert.alert('Error', 'No se pudo cerrar sesión.');
    }
  };

  const confirmDelete = (petId: string) => {
    Alert.alert(
      'Eliminar mascota',
      '¿Estás seguro de que quieres eliminar esta mascota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'pets', petId));
            } catch {
              Alert.alert('Error', 'No se pudo eliminar la mascota.');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#30C5FF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraModal
        isVisible={modalVisible}
        setImage={asset => asset.uri && uploadToStorage(asset.uri)}
        closeModal={() => setModalVisible(false)}
      />

      <TouchableOpacity style={styles.goBack} onPress={() => router.replace(Routes.Home)}>
        <Image source={goBackIcon} style={styles.goBackIcon} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: 64 + 24 }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.title}>Hello, {name.split(' ')[0]}</Text>
          <TouchableOpacity
            style={styles.editPhotoButton}
            onPress={() => setModalVisible(true)}
          >
            {uploading
              ? <ActivityIndicator size="small" color="#FFFFFF" />
              : <Text style={styles.editPhotoText}>Editar foto</Text>
            }
          </TouchableOpacity>
        </View>

        {/* Foto */}
        <View style={styles.profilePicContainer}>
          <Image
            source={ photoUrl
              ? { uri: photoUrl }
              : require('../../../assets/images/default-profile.jpeg')
            }
            style={styles.profilePic}
          />
        </View>

        {/* Información personal */}
        <Text style={styles.sectionTitle}>Información personal</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Image source={personaIcon} style={styles.infoIcon} />
            <Text style={styles.infoText}>{name}</Text>
          </View>
          <View style={styles.infoItem}>
            <Image source={correoIcon} style={styles.infoIcon} />
            <Text style={styles.infoText}>{email}</Text>
          </View>
        </View>

        {/* Mascotas */}
        <Text style={styles.sectionTitle}>Mis mascotas</Text>
        <View style={styles.petsCard}>
          {pets.length > 0
            ? pets.map((p: Pet) => (
                <View key={p.id} style={styles.petRow}>
                  <Image source={pawSmallIcon} style={styles.petRowIcon} />
                  <Text style={styles.petName}>{p.name}</Text>

                  {/* Editar mascota */}
                  <TouchableOpacity
                    onPress={() => router.push(`${Routes.EditMascota}?id=${p.id}`)}
                  >
                    <Image source={editIcon} style={styles.editIcon} />
                  </TouchableOpacity>

                  {/* Borrar mascota */}
                  <TouchableOpacity onPress={() => confirmDelete(p.id)}>
                    <Image source={trashIcon} style={styles.editIcon} />
                  </TouchableOpacity>
                </View>
              ))
            : <Text style={styles.infoText}>No tienes mascotas aún</Text>
          }
        </View>

        {/* Botones */}
        <TouchableOpacity style={styles.addPetButton} onPress={() => router.replace(Routes.AddMascota)}>
          <Text style={styles.addPetText}>+ Añadir mascota</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Tab bar */}
      <View style={styles.tabBar}>
        {[ homeIcon, petbotIcon, mediaIcon, perfilIcon ].map((icon, i) => (
          <TouchableOpacity
            key={i}
            style={styles.tabItem}
            onPress={() => {
              const routes = [Routes.Home, Routes.Petbot, Routes.Media, Routes.Perfil];
              router.replace(routes[i]);
            }}
          >
            <Image source={icon} style={styles.tabIcon} />
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
