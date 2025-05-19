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
import styles from '../../styles/perfil/perfil';
// Define TAB_BAR_HEIGHT directly if not exported from the styles file
const TAB_BAR_HEIGHT = 64;
import { CameraModal } from '../../components/CameraModal';
import { AuthContext } from '../../context/AuthContext';
import { ProfileContext } from '../../context/ProfileContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db } from '../../utils/FirebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

import goBackIcon   from '../../assets/images/goBack.png';
import personaIcon  from '../../assets/images/persona.png';
import correoIcon   from '../../assets/images/correo.png';
import pawSmallIcon from '../../assets/images/mascota.png';
import homeIcon     from '../../assets/images/home.png';
import petbotIcon   from '../../assets/images/petbot.png';
import mediaIcon    from '../../assets/images/media.png';
import perfilIcon   from '../../assets/images/perfil.png';
import { Routes } from '../../route';

export default function Perfil() {
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  const { name, email, pets, photoUrl, loading, refreshProfile } = useContext(ProfileContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Cierra sesión
  const handleLogout = async () => {
    try {
      await logout();
      router.replace(Routes.Login);
    } catch {
      Alert.alert('Error', 'No se pudo cerrar sesión.');
    }
  };

  // Sube la imagen a Storage, guarda URL en Firestore y refresca contexto
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

      // Guarda URL en Firestore
      await updateDoc(doc(db, 'users', uid), { photoUrl: downloadUrl });

      // Refresca nombre, email, photoUrl y pets
      await refreshProfile();

    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo subir la imagen.');
    } finally {
      setUploading(false);
      setModalVisible(false);
    }
  };

  // Callback pasado al modal
  const handleSetImage = (asset: { uri: string }) => {
    if (asset.uri) uploadToStorage(asset.uri);
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

      {/* Modal cámara/galería */}
      <CameraModal
        isVisible={modalVisible}
        setImage={handleSetImage}
        closeModal={() => setModalVisible(false)}
      />

      {/* Botón “<-” */}
      <TouchableOpacity style={styles.goBack} onPress={() => router.replace(Routes.Home)}>
        <Image source={goBackIcon} style={styles.goBackIcon} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT + 24 }}>

        {/* Cabecera: saludo + editar foto */}
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

        {/* Foto de perfil */}
        <View style={styles.profilePicContainer}>
          <Image
            source={
              photoUrl
                ? { uri: photoUrl }
                : require('../../assets/images/default-profile.jpeg')
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
            ? pets.map((p, i) => (
                <View key={i} style={styles.petRow}>
                  <Image source={pawSmallIcon} style={styles.petRowIcon} />
                  <Text style={styles.petName}>{p}</Text>
                </View>
              ))
            : <Text style={styles.infoText}>No tienes mascotas aún</Text>
          }
        </View>

        {/* + Añadir mascota (próximamente) */}
        <TouchableOpacity style={styles.addPetButton} onPress={() => router.replace(Routes.AddMascota)}>
          <Text style={styles.addPetText}>+ Añadir mascota</Text>
        </TouchableOpacity>

        {/* Cerrar sesión */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Barra de pestañas */}
      <View style={styles.tabBar}>
        {[
          { icon: homeIcon,   label: 'Home',    route: Routes.Home   },
          { icon: petbotIcon, label: 'Pet bot', route: Routes.Home   },
          { icon: mediaIcon,  label: 'Media',   route: Routes.Home   },
          { icon: perfilIcon, label: 'Perfil',  route: Routes.Perfil },
        ].map((tab, i) => (
          <TouchableOpacity
            key={i}
            style={styles.tabItem}
            onPress={() => router.replace(tab.route)}
          >
            <Image source={tab.icon} style={styles.tabIcon} />
            <Text style={styles.tabLabel}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
