import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Routes } from '../../route';
import styles from '../../styles/home/home';
import { PetsContext } from '../../context/PetsContext';

// Colores de ejemplo para el carrusel
const bannerColors = ['#FFC107', '#03A9F4', '#8BC34A'];

export default function Home() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [bannerIndex, setBannerIndex] = useState(0);
  const { pets, loading } = useContext(PetsContext);


  const prevBanner = () =>
    setBannerIndex((bannerIndex - 1 + bannerColors.length) % bannerColors.length);
  const nextBanner = () =>
    setBannerIndex((bannerIndex + 1) % bannerColors.length);

  const tabs = [
    { icon: require('../../assets/images/home.png'),    label: 'Home',    route: Routes.Home },
    { icon: require('../../assets/images/petbot.png'),  label: 'Pet bot', route: Routes.Home },
    { icon: require('../../assets/images/media.png'),   label: 'Media',   route: Routes.Media },
    { icon: require('../../assets/images/perfil.png'),  label: 'Perfil',  route: Routes.Perfil },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity onPress={() => {/* notificaciones */}}>
          <Image
            source={require('../../assets/images/notificaciones.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Carrusel manual */}
        <View style={[styles.bannerContainer, { width: width - 32 }]}>
          <View
            style={[
              styles.bannerPlaceholder,
              { backgroundColor: bannerColors[bannerIndex] },
            ]}
          />
          <TouchableOpacity
            style={[styles.navButton, styles.navLeft]}
            onPress={prevBanner}
          />
          <TouchableOpacity
            style={[styles.navButton, styles.navRight]}
            onPress={nextBanner}
          />
        </View>

        {/* Mis mascotas */}
        <Text style={styles.sectionTitle}>Mis mascotas</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.petsList}
        >
           {pets.map((p) => (
              <View key={p.id} style={styles.petCard}>
                <Image
                  source={
                    p.photoUrl
                      ? { uri: p.photoUrl }
                      : require('../../assets/images/default-profile.jpeg')
                  }
                  style={styles.petPlaceholder}
                />
                <Text style={styles.petName}>{p.name}</Text>
              </View>
            ))}
          </ScrollView>
        

        {/* Próximas citas */}
        <Text style={styles.sectionTitle}>Próximas citas</Text>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Image
              source={require('../../assets/images/calendario.png')}
              style={styles.cardIcon}
            />
            <Text style={styles.cardTitle}>Chequeo médico Titán</Text>
          </View>
          <Text style={styles.cardDate}>30 de mayo, 2 pm</Text>
          <View style={styles.cardButtons}>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => router.push(Routes.AddAppointment)}  // <-- aquí
            >
              <Text style={styles.cardButtonText}>+ Añadir cita</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Ver todos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Ver QR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tabs */}
      <View style={styles.tabBar}>
        {tabs.map((tab, i) => (
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
