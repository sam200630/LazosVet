import React, { useEffect, useContext } from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '../context/AuthContext';
import { Routes } from '../route';
import { initNotifications } from './services/Notifications';

export default function Splash() {
  const router = useRouter();
  const { user, userType } = useContext(AuthContext);

  useEffect(() => {
    initNotifications();

    const timeout = setTimeout(() => {
      if (!user) {
        router.replace(Routes.Login);
      } else if (userType === 'admin') {
        router.replace(Routes.AdminHome);
      } else {
        router.replace(Routes.Home);
      }
    }, 2000); // tiempo reducido para pruebas (ajústalo a 5000 si quieres)

    return () => clearTimeout(timeout);
  }, [user, userType]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#30C5FF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
