import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../../styles/media/add';
import goBackIcon   from '../../../assets/images/goBack.png';
import camaraIcon   from '../../../assets/images/camara.png';
import imagenIcon   from '../../../assets/images/foto.png';
import homeIcon     from '../../../assets/images/home.png';
import petbotIcon   from '../../../assets/images/petbot.png';
import mediaIcon    from '../../../assets/images/media.png';
import perfilIcon   from '../../../assets/images/perfil.png';
import { Routes } from '../../../route';
import BottomTabs from '../../../components/bottonsTab';

export default function AddMedia() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* ← Atrás */}
      <TouchableOpacity style={styles.goBack} onPress={() => router.back()}>
        <Image source={goBackIcon} style={styles.goBackIcon} />
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Añadir publicación</Text>

      {/* Botones cámara / galería */}
      <View style={styles.iconsRow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => {/* TODO: abrir cámara */}}>
          <Image source={camaraIcon} style={styles.icon} />
          <Text style={styles.iconLabel}>Tomar foto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => {/* TODO: abrir galería */}}>
          <Image source={imagenIcon} style={styles.icon} />
          <Text style={styles.iconLabel}>Escoger foto</Text>
        </TouchableOpacity>
      </View>

      {/* Descripción */}
      <Text style={styles.label}>Recomendaciones adicionales</Text>
      <TextInput
        style={styles.input}
        placeholder="Añade una descripción interesante"
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
      />

      {/* Botones publicar / cancelar */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={styles.publishButton}
          onPress={() => {/* TODO: acción publicar */}}
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

      {/* Tabs inferiores */}
       <BottomTabs />
      
    </SafeAreaView>
);
}
