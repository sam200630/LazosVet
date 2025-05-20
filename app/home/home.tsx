// app/home/home.tsx

import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Routes } from '../../route';
import styles from '../../styles/home/home';
import { PetsContext } from '../../context/PetsContext';
import { DatesContext } from '../../context/DatesContext';

// Importa imágenes estáticas
import homeIcon from '../../assets/images/home.png';
import petbotIcon from '../../assets/images/petbot.png';
import mediaIcon from '../../assets/images/media.png';
import perfilIcon from '../../assets/images/perfil.png';
import notificacionesIcon from '../../assets/images/notificaciones.png';
import defaultProfile from '../../assets/images/default-profile.jpeg';
import calendarioIcon from '../../assets/images/calendario.png';
import addIcon from '../../assets/images/+.png';

// Colores de ejemplo para el carrusel
const bannerColors = ['#FFC107', '#03A9F4', '#8BC34A'];

export default function Home() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [bannerIndex, setBannerIndex] = useState(0);

  const { pets } = useContext(PetsContext);
  const { dates, loading: loadingDates } = useContext(DatesContext);

  const prevBanner = () =>
    setBannerIndex((bannerIndex - 1 + bannerColors.length) % bannerColors.length);
  const nextBanner = () =>
    setBannerIndex((bannerIndex + 1) % bannerColors.length);

  const tabs = [
    { icon: homeIcon,    label: 'Home',    route: Routes.Home },
    { icon: petbotIcon,  label: 'Pet bot', route: Routes.Home },
    { icon: mediaIcon,   label: 'Media',   route: Routes.Media },
    { icon: perfilIcon,  label: 'Perfil',  route: Routes.Perfil },
  ];

  // Ordena citas por fecha y hora, y toma la siguiente
  const nextDate =
    dates.length > 0
      ? [...dates].sort((a, b) => {
          const dtA = new Date(`${a.date}T${a.time}`);
          const dtB = new Date(`${b.date}T${b.time}`);
          return dtA.getTime() - dtB.getTime();
        })[0]
      : null;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity onPress={() => {/* Aquí irían las notificaciones */}}>
          <Image
            source={notificacionesIcon}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Carrusel */}
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
          {pets.map(p => (
            <TouchableOpacity
              key={p.id}
              style={styles.petCard}
              onPress={() => router.push(`${Routes.Mascota}?id=${p.id}`)}
            >
              <Image
                source={
                  p.photoUrl
                    ? { uri: p.photoUrl }
                    : defaultProfile
                }
                style={styles.petPlaceholder}
              />
              <Text style={styles.petName}>{p.name}</Text>
            </TouchableOpacity>
          ))}

          {/* Cuadro para añadir mascota */}
          <TouchableOpacity
            style={[styles.petCard, styles.addPetCard]}
            onPress={() => router.push(Routes.AddMascota)}
          >
            <Image
              source={addIcon}
              style={styles.addPetIcon}
            />
          </TouchableOpacity>
        </ScrollView>

        {/* Próximas citas */}
        <Text style={styles.sectionTitle}>Próximas citas</Text>
        {loadingDates ? (
          <ActivityIndicator style={{ marginVertical: 16 }} size="small" color="#30C5FF" />
        ) : nextDate ? (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Image
                source={calendarioIcon}
                style={styles.cardIcon}
              />
              <Text style={styles.cardTitle}>
                {`${nextDate.reason} ${nextDate.petName}`}
              </Text>
            </View>
            <Text style={styles.cardDate}>
              {`${nextDate.date}, ${nextDate.time}`}
            </Text>
            <View style={styles.cardButtons}>
              <TouchableOpacity
                style={styles.cardButton}
                onPress={() => router.push(Routes.AddAppointment)}
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
        ) : (
          <>
            <Text style={{ marginHorizontal: 16, color: '#666' }}>
              No tienes citas próximas.
            </Text>
            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => router.push(Routes.AddAppointment)}
            >
              <Text style={styles.cardButtonText}>+ Añadir cita</Text>
            </TouchableOpacity>
          </>
        )}
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
