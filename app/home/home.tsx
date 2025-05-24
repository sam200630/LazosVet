import React, {
  useContext,
  useState,
  useEffect,
  useRef
} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
  SafeAreaView,
  ActivityIndicator,
  Animated,
  Platform,
  UIManager,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Routes } from '../../route';
import styles from '../../styles/home/home';
import { PetsContext } from '../../context/PetsContext';
import { DatesContext, DateType } from '../../context/DatesContext';

// Imágenes estáticas
import homeIcon           from '../../assets/images/home.png';
import petbotIcon         from '../../assets/images/petbot.png';
import mediaIcon          from '../../assets/images/media.png';
import perfilIcon         from '../../assets/images/perfil.png';
import notificacionesIcon from '../../assets/images/notificaciones.png';
import defaultProfile     from '../../assets/images/default-profile.jpeg';
import calendarioIcon     from '../../assets/images/calendario.png';
import addIcon            from '../../assets/images/+.png';
import banner1            from '../../assets/images/banner1.jpg';
import banner2            from '../../assets/images/banner2.jpg';
import banner3            from '../../assets/images/banner3.jpg';

const bannerImages = [banner1, banner2, banner3];

export default function Home() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Enable LayoutAnimation on Android if needed
  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental?.(true);
    }
  }, []);

  // Contextos
  const { pets } = useContext(PetsContext);
  const { dates, loading: loadingDates, OtherDates } = useContext(DatesContext);

  // Próxima cita
  const nextDate =
    dates.length > 0
      ? [...dates].sort((a, b) =>
          new Date(`${a.date}T${a.time}`).getTime() -
          new Date(`${b.date}T${b.time}`).getTime()
        )[0]
      : null;

  // --- Carrusel Animado ---
  const [bannerIndex, setBannerIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    slideAnim.setValue(direction === 'next' ? width : -width);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [bannerIndex]);

  useEffect(() => {
    const iv = setInterval(() => {
      setDirection('next');
      setBannerIndex(i => (i + 1) % bannerImages.length);
    }, 15000);
    return () => clearInterval(iv);
  }, []);

  const prevBanner = () => {
    setDirection('prev');
    setBannerIndex(i => (i - 1 + bannerImages.length) % bannerImages.length);
  };
  const nextBanner = () => {
    setDirection('next');
    setBannerIndex(i => (i + 1) % bannerImages.length);
  };

  // --- Citas Expandibles Animadas ---
  const [expanded, setExpanded] = useState(false);
  const [allDates, setAllDates] = useState<DateType[]>([]);
  const expandAnim = useRef(new Animated.Value(0)).current;

  const toggleExpand = async () => {
    if (!expanded) {
      const result = await OtherDates();
      setAllDates(result);
    }
    Animated.timing(expandAnim, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(e => !e);
  };

  // Tabs Inferior
  const tabs = [
    { icon: homeIcon,   label: 'Home',    route: Routes.Home },
    { icon: petbotIcon, label: 'Pet bot', route: Routes.Petbot },
    { icon: mediaIcon,  label: 'Media',   route: Routes.Media },
    { icon: perfilIcon, label: 'Perfil',  route: Routes.Perfil },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity>
          <Image source={notificacionesIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Carrusel */}
        <View style={[styles.bannerContainer, { width: width - 32 }]}>
          <Animated.View style={{ transform: [{ translateX: slideAnim }] }}>
            <Image
              source={bannerImages[bannerIndex]}
              style={styles.bannerImage}
              resizeMode="cover"
            />
          </Animated.View>
          <TouchableOpacity style={[styles.navButton, styles.navLeft]} onPress={prevBanner} />
          <TouchableOpacity style={[styles.navButton, styles.navRight]} onPress={nextBanner} />
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
                source={p.photoUrl ? { uri: p.photoUrl } : defaultProfile}
                style={styles.petPlaceholder}
              />
              <Text style={styles.petName}>{p.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[styles.petCard, styles.addPetCard]}
            onPress={() => router.push(Routes.AddMascota)}
          >
            <Image source={addIcon} style={styles.addPetIcon} />
          </TouchableOpacity>
        </ScrollView>

        {/* Próximas citas */}
        <Text style={styles.sectionTitle}>Próximas citas</Text>
        {loadingDates ? (
          <ActivityIndicator style={{ marginVertical: 16 }} size="small" color="#30C5FF" />
        ) : nextDate ? (
          <View style={styles.card}>
            {/* Cita Principal */}
            <View style={styles.cardHeader}>
              <Image source={calendarioIcon} style={styles.cardIcon} />
              <Text style={styles.cardTitle}>
                {`${nextDate.reason} ${nextDate.petName}`}
              </Text>
            </View>
            
            
            <View style={styles.cardDateRow}>
              <Text style={styles.cardDate}>
                {`${nextDate.date}, ${nextDate.time}`}
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  style={styles.detailButton}
                  onPress={() =>
                    router.push(`${Routes.DetallesCita}?id=${nextDate.id}`)
                  }
                >
                  <Text style={styles.detailButtonText}>Detalles</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.detailButton}
                  onPress={() =>
                    router.push(`${Routes.QR}?id=${nextDate.id}`)
                  }
                >
                  <Text style={styles.detailButtonText}>Ver QR</Text>
                </TouchableOpacity>
              </View>
            </View>


            {/* Lista Expandible */}
            <Animated.View
              style={{
                height: expandAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 200] }),
                opacity: expandAnim,
                overflow: 'hidden',
              }}
            >
              <ScrollView showsVerticalScrollIndicator style={{ marginTop: 12 }}>
                {allDates.map(cita => (
                  <View key={cita.id} style={{ marginBottom: 12 }}>
                    <View style={styles.cardHeader}>
                      <Image source={calendarioIcon} style={styles.cardIcon} />
                      <Text style={styles.cardTitle}>
                        {`${cita.reason} ${cita.petName}`}
                      </Text>
                    </View>
                    
                    <View style={styles.cardDateRow}>
                  <Text style={styles.cardDate}>
                    {`${cita.date}, ${cita.time}`}
                  </Text>
                  <View style={{ flexDirection: 'row', marginInline: 8 }}>
                    <TouchableOpacity
                      style={styles.detailButton}
                      onPress={() =>
                        router.push(`${Routes.DetallesCita}?id=${cita.id}`)
                      }
                    >
                      <Text style={styles.detailButtonText}>Detalles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.detailButton}
                      onPress={() =>
                        router.push(`${Routes.QR}?id=${cita.id}`)
                      }
                    >
                      <Text style={styles.detailButtonText}>Ver QR</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
              </ScrollView>
            </Animated.View>

            {/* Botones de acción */}
            <View style={styles.cardButtons}>
              <TouchableOpacity
                style={styles.cardButton}
                onPress={() => router.push(Routes.AddAppointment)}
              >
                <Text style={styles.cardButtonText}>+ Añadir cita</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardButton} onPress={toggleExpand}>
                <Text style={styles.cardButtonText}>
                  {expanded ? 'Ocultar' : 'Ver todos'}
                </Text>
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
