import React, {
  useEffect,
  useState,
  useRef,
  useContext,
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
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../utils/FirebaseConfig';
import { Pet } from '../../context/PetsContext';
import { DateType } from '../../context/DatesContext';
import { Routes } from '../../route';
import styles from '../../styles/admin/home';
import { Calendar } from 'react-native-calendars';
import { AuthContext } from '../../context/AuthContext';
import BottomTabs from '../../components/bottonsTab';

import homeIcon           from '../../assets/images/home.png';
import scanIcon           from '../../assets/images/escanear.png';
import mediaIcon          from '../../assets/images/media.png';
import perfilIcon         from '../../assets/images/perfil.png';
import notificacionesIcon from '../../assets/images/notificaciones.png';
import defaultProfile     from '../../assets/images/default-profile.jpeg';
import calendarioIcon     from '../../assets/images/calendario.png';
import banner1            from '../../assets/images/banner1.png';
import banner2            from '../../assets/images/banner2.jpg';
import banner3            from '../../assets/images/banner3.jpg';

const bannerImages = [banner1, banner2, banner3];

export default function AdminHome() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Enable LayoutAnimation on Android
  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental?.(true);
    }
  }, []);

  // Todas las mascotas
  const [allPets, setAllPets] = useState<Pet[]>([]);
  const [loadingPets, setLoadingPets] = useState(true);
  const { userType } = useContext(AuthContext);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'pets'),
      snap => {
        setAllPets(snap.docs.map(d => ({
          id: d.id,
          ...(d.data() as any)
        } as Pet)));
        setLoadingPets(false);
      },
      () => setLoadingPets(false)
    );
    return () => unsub();
  }, []);

  // Todas las citas
  const [allDates, setAllDates] = useState<DateType[]>([]);
  const [loadingDates, setLoadingDates] = useState(true);
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'dates'),
      snap => {
        setAllDates(snap.docs.map(d => ({
          id: d.id,
          ...(d.data() as any)
        } as DateType)));
        setLoadingDates(false);
      },
      () => setLoadingDates(false)
    );
    return () => unsub();
  }, []);

  // Búsqueda de mascotas
  const [searchText, setSearchText] = useState('');
  const filteredPets = allPets.filter(p =>
    p.name.toLowerCase().includes(searchText.trim().toLowerCase())
  );

  // Filtros de citas
  const [dateFilter, setDateFilter] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  });
  const [showDateFilter, setShowDateFilter] = useState(false);

  const reasonOptions = ['Todas','Baño','Consulta','Control'];
  const [reasonFilter, setReasonFilter] = useState('Todas');
  const [showReasonFilter, setShowReasonFilter] = useState(false);

  const filteredDates = allDates.filter(d =>
    d.date === dateFilter &&
    (reasonFilter === 'Todas' || d.reason === reasonFilter)
  );
  const nextDate = filteredDates.length > 0
    ? filteredDates.sort((a,b)=>
        new Date(`${a.date}T${a.time}`).getTime() -
        new Date(`${b.date}T${b.time}`).getTime()
      )[0]
    : null;

  // Carrusel animado
  const [bannerIndex, setBannerIndex]     = useState(0);
  const [direction, setDirection]         = useState<'next'|'prev'>('next');
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    slideAnim.setValue(direction==='next'? width : -width);
    Animated.timing(slideAnim, { toValue:0, duration:500, useNativeDriver:true }).start();
  }, [bannerIndex]);

  useEffect(() => {
    const iv = setInterval(() => {
      setDirection('next');
      setBannerIndex(i=>(i+1)%bannerImages.length);
    },15000);
    return () => clearInterval(iv);
  }, []);

  const prevBanner = () => { setDirection('prev'); setBannerIndex(i=>(i-1+bannerImages.length)%bannerImages.length); };
  const nextBanner = () => { setDirection('next'); setBannerIndex(i=>(i+1)%bannerImages.length); };

  // Calcular aspect ratio
  const asset = bannerImages[bannerIndex];
  const { width: imgW, height: imgH } = Image.resolveAssetSource(asset);
  const aspectRatio = imgW / imgH;

  // Expandir lista de citas con altura dinámica
  const [expanded, setExpanded] = useState(false);
  const expandAnim = useRef(new Animated.Value(0)).current;
  const [contentHeight, setContentHeight] = useState(0);

  const toggleExpand = () => {
    Animated.timing(expandAnim, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(e=>!e);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Admin Home</Text>
        <TouchableOpacity>
          <Image source={notificacionesIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom:32 }}>
        {/* Carrusel */}
        <View style={[styles.bannerContainer,{ width: width - 32 }]}>
          <Animated.View style={{ transform:[{ translateX: slideAnim }] }}>
            <Image
              source={asset}
              style={[styles.bannerImage, { aspectRatio }]}
              resizeMode="cover"
            />
          </Animated.View>
          <TouchableOpacity style={[styles.navButton, styles.navLeft]} onPress={prevBanner}/>
          <TouchableOpacity style={[styles.navButton, styles.navRight]} onPress={nextBanner}/>
          <View style={styles.dots}>
            {bannerImages.map((_, i) => (
              <View key={i} style={[styles.dot, i===bannerIndex && styles.dotActive]} />
            ))}
          </View>
        </View>

        {/* Mascotas */}
        <Text style={styles.sectionTitle}>Mis mascotas</Text>
        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Buscar mascota..."
          style={styles.searchInput}
        />
        {loadingPets ? (
          <ActivityIndicator size="small" color="#30C5FF" style={{ marginVertical:16 }}/>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.petsList}>
            {filteredPets.map(p=>(
              <TouchableOpacity
                key={p.id}
                style={styles.petCard}
                onPress={()=>router.push(`${Routes.Mascota}?id=${p.id}`)}
              >
                <Image source={p.photoUrl?{uri:p.photoUrl}:defaultProfile} style={styles.petPlaceholder}/>
                <Text style={styles.petName}>{p.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Próximas citas */}
        <Text style={styles.sectionTitle}>Próximas citas</Text>

        {/* Filtros */}
        <View style={styles.filterSection}>
          <TouchableOpacity style={styles.filterButton} onPress={()=>setShowDateFilter(v=>!v)}>
            <Image source={calendarioIcon} style={styles.filterIcon}/>
            <Text style={styles.filterButtonText}>{dateFilter}</Text>
          </TouchableOpacity>
          {showDateFilter && (
            <View style={styles.calendarWrapper}>
              <Calendar
                onDayPress={day=>{
                  setDateFilter(day.dateString);
                  setShowDateFilter(false);
                  setExpanded(false);
                }}
                markedDates={{ [dateFilter]: { selected:true } }}
                theme={{
                  arrowColor:'#A15E49',
                  todayTextColor:'#30C5FF',
                  selectedDayBackgroundColor:'#30C5FF',
                }}
                style={styles.calendar}
              />
            </View>
          )}
          <TouchableOpacity
            style={[styles.filterButton, styles.reasonFilter]}
            onPress={()=>setShowReasonFilter(v=>!v)}
          >
            <Text style={styles.filterButtonText}>{reasonFilter}</Text>
          </TouchableOpacity>
          {showReasonFilter && (
            <View style={styles.dropdown}>
              {reasonOptions.map(r=>(
                <TouchableOpacity
                  key={r}
                  style={styles.option}
                  onPress={()=>{
                    setReasonFilter(r);
                    setShowReasonFilter(false);
                    setExpanded(false);
                  }}
                >
                  <Text style={styles.optionText}>{r}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {loadingDates ? (
          <ActivityIndicator size="small" color="#30C5FF" style={{ marginVertical:16 }}/>
        ) : nextDate ? (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Image source={calendarioIcon} style={styles.cardIcon}/>
              <Text style={styles.cardTitle}>{`${nextDate.reason} ${nextDate.petName}`}</Text>
            </View>
            <View style={styles.cardDateRow}>
              <Text style={styles.cardDate}>{`${nextDate.date}, ${nextDate.time}`}</Text>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={()=>router.push(`${Routes.DetallesCita}?id=${nextDate.id}`)}
              >
                <Text style={styles.detailButtonText}>Detalles</Text>
              </TouchableOpacity>
            </View>

            {/* Expandible */}
            <Animated.View style={{
              height: expandAnim.interpolate({ inputRange:[0,1], outputRange:[0, contentHeight] }),
              opacity: expandAnim,
              overflow:'hidden',
            }}>
              <View
                onLayout={e=>setContentHeight(e.nativeEvent.layout.height)}
              >
                {filteredDates.map(c=>(
                  <View key={c.id} style={{ marginBottom:12 }}>
                    <View style={styles.cardHeader}>
                      <Image source={calendarioIcon} style={styles.cardIcon}/>
                      <Text style={styles.cardTitle}>{`${c.reason} ${c.petName}`}</Text>
                    </View>
                    <View style={styles.cardDateRow}>
                      <Text style={styles.cardDate}>{`${c.date}, ${c.time}`}</Text>
                      <TouchableOpacity
                        style={styles.detailButton}
                        onPress={()=>router.push(`${Routes.DetallesCita}?id=${c.id}`)}
                      >
                        <Text style={styles.detailButtonText}>Detalles</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </Animated.View>

            <View style={styles.cardButtons}>
              <TouchableOpacity
                style={styles.cardButton}
                onPress={()=>router.push(Routes.AdminAddCita)}
              >
                <Text style={styles.cardButtonText}>+ Añadir cita</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardButton} onPress={toggleExpand}>
                <Text style={styles.cardButtonText}>{expanded?'Ocultar':'Ver todos'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Text style={{ marginHorizontal:16, color:'#666' }}>No hay citas.</Text>
        )}
      </ScrollView>

      {/* Tabs inferiores */}
      <BottomTabs />
    </SafeAreaView>
  );
}
