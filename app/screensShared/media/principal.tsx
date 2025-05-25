// app/media/principal.tsx

import React, { useContext, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Routes } from '../../../route';
import { AuthContext } from '../../../context/AuthContext';
import styles from '../../../styles/media/principal';
import BottomTabs from '../../../components/bottonsTab';

// Iconos estáticos
import lupaIcon    from '../../../assets/images/lupa.png';
import plusIcon    from '../../../assets/images/+.png';
import likeIcon    from '../../../assets/images/like.png';
import commentIcon from '../../../assets/images/coments.png';
import homeIcon    from '../../../assets/images/home.png';
import petbotIcon  from '../../../assets/images/petbot.png';
import mediaIcon   from '../../../assets/images/media.png';
import scanIcon    from '../../../assets/images/escanear.png'; 
import perfilIcon  from '../../../assets/images/perfil.png';

export default function MediaPrincipal() {
  const router = useRouter();
  const [tab, setTab] = useState<'publicaciones' | 'preguntas'>('publicaciones');
  const { userType } = useContext(AuthContext); 

  


  return (
    <SafeAreaView style={styles.container}>
      {/* Header con lupa a la izquierda, selector en el centro y + a la derecha */}
      <View style={styles.header}>
        {/* lupa a la izquierda */}
        <TouchableOpacity onPress={() => {/* TODO: acción búsqueda */}}>
          <Image source={lupaIcon} style={styles.icon} />
        </TouchableOpacity>

        {/* Selector de pestañas */}
        <View style={styles.tabSelector}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              tab === 'publicaciones' && styles.tabButtonActive
            ]}
            onPress={() => setTab('publicaciones')}
          >
            <Text
              style={[
                styles.tabText,
                tab === 'publicaciones' && styles.tabTextActive
              ]}
            >
              Publicaciones
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              tab === 'preguntas' && styles.tabButtonActive
            ]}
            onPress={() => setTab('preguntas')}
          >
            <Text
              style={[
                styles.tabText,
                tab === 'preguntas' && styles.tabTextActive
              ]}
            >
              P&R
            </Text>
          </TouchableOpacity>
        </View>

        {/* + a la derecha */}
        <TouchableOpacity onPress={() => router.push(Routes.AddMedia)}>
          <Image source={plusIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.feed}>
        {/* Ejemplo de publicación */}
        <View style={styles.post}>
          <View style={styles.postHeader}>
            <View style={styles.avatarPlaceholder} />
            <Text style={styles.username}>@andre</Text>
          </View>
          <View style={styles.postImagePlaceholder} />
          <View style={styles.postActions}>
            <View style={styles.actionItem}>
              <Image source={likeIcon} style={styles.actionIcon} />
              <Text style={styles.actionText}>10</Text>
            </View>
            <View style={styles.actionItem}>
              <Image source={commentIcon} style={styles.actionIcon} />
              <Text style={styles.actionText}>1</Text>
            </View>
          </View>
          <Text style={styles.description}>
            @andre Excelente servicio, encantada con la atención brindada a mi pequeña Kiara
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Tabs */}
      <BottomTabs />
    </SafeAreaView>
  );
}
