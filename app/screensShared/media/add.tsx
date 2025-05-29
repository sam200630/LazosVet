// app/screensShared/media/add.tsx

import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../../styles/media/add';
import goBackIcon  from '../../../assets/images/goBack.png';
import camaraIcon  from '../../../assets/images/camara.png';
import { Routes }  from '../../../route';
import BottomTabs   from '../../../components/bottonsTab';
import { MediaContext } from '../../../context/mediaContext';
import { AuthContext }  from '../../../context/AuthContext';
import { CameraModal }  from '../../../components/CameraModal';

export default function AddMedia() {
  const router = useRouter();
  const { addPost } = useContext(MediaContext);
  const { user }    = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [imageUri, setImageUri]         = useState<string | null>(null);
  const [description, setDescription]   = useState<string>('');

  const handlePublish = async () => {
    if (!user) return Alert.alert('Error', 'Debes iniciar sesión');
    if (!imageUri) return Alert.alert('Error', 'Selecciona una imagen');
    try {
      await addPost(user.uid, imageUri, description);
      router.replace(Routes.Media);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'No se pudo publicar, intenta de nuevo');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Galery modal */}
      <CameraModal
        isVisible={modalVisible}
        setImage={img => {
          if (img.uri) setImageUri(img.uri);
        }}
        closeModal={() => setModalVisible(false)}
      />

      {/* ← back */}
      <TouchableOpacity style={styles.goBack} onPress={() => router.back()}>
        <Image source={goBackIcon} style={styles.goBackIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>Añadir publicación</Text>

      {/* Buttons camera and gallery */}
      <View style={styles.iconsRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setModalVisible(true)}
        >
          <Image source={camaraIcon} style={styles.icon} />
          <Text style={styles.iconLabel}>Tomar / Escoger</Text>
        </TouchableOpacity>
      </View>

      {/* preview */}
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: '100%', height: 200, marginVertical: 16 }}
          resizeMode="cover"
        />
      )}

      {/* Description */}
      <Text style={styles.label}>Descripcion</Text>
      <TextInput
        style={styles.input}
        placeholder="Añade una descripción interesante"
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      {/* Publish / cancel */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.publishButton}
          onPress={handlePublish}
        >
          <Text style={styles.publishText}>Publicar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.back()}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs  */}
      <BottomTabs />
    </SafeAreaView>
  );
}
