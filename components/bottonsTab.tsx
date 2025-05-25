// components/BottomTabs.tsx
import React, { useContext, useMemo } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '../context/AuthContext';
import { Routes } from '../route';
import styles from '../styles/home/home'; // crea un estilo base

// Iconos
import homeIcon from '../assets/images/home.png';
import scanIcon from '../assets/images/escanear.png';
import petbotIcon from '../assets/images/petbot.png';
import mediaIcon from '../assets/images/media.png';
import perfilIcon from '../assets/images/perfil.png';

export default function BottomTabs() {
  const { userType } = useContext(AuthContext);
  const router = useRouter();

  const tabs = useMemo(() => {
    if (userType === 'admin') {
      return [
        { icon: homeIcon,   label: 'Home',     route: Routes.AdminHome},
        { icon: scanIcon,   label: 'Escanear', route: Routes.AdminScanner },
        { icon: mediaIcon,  label: 'Media',    route: Routes.Media },
        { icon: perfilIcon, label: 'Perfil',   route: Routes.Perfil },
      ];
    } else {
      return [
        { icon: homeIcon,   label: 'Home',     route: Routes.Home },
        { icon: petbotIcon, label: 'Pet bot',  route: Routes.Petbot },
        { icon: mediaIcon,  label: 'Media',    route: Routes.Media },
        { icon: perfilIcon, label: 'Perfil',   route: Routes.Perfil },
      ];
    }
  }, [userType]);

  return (
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
  );
}
