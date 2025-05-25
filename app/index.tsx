// app/index.tsx
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Routes } from '../route';
import { initNotifications } from './services/Notifications';

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
     initNotifications();
    const timeout = setTimeout(() => {
      router.replace(Routes.Login);  // tras 5 s, va a Login
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

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
