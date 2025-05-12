// app/_layout.tsx
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { AuthProvider } from '../Context/AuthContext';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Poppins-Black':                require('../assets/fonts/Poppins/Poppins-Black.ttf'),
    'Poppins-BlackItalic':          require('../assets/fonts/Poppins/Poppins-BlackItalic.ttf'),
    'Poppins-Bold':                 require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    'Poppins-BoldItalic':           require('../assets/fonts/Poppins/Poppins-BoldItalic.ttf'),
    'Poppins-ExtraBold':            require('../assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
    'Poppins-ExtraBoldItalic':      require('../assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf'),
    'Poppins-ExtraLight':           require('../assets/fonts/Poppins/Poppins-ExtraLight.ttf'),
    'Poppins-ExtraLightItalic':     require('../assets/fonts/Poppins/Poppins-ExtraLightItalic.ttf'),
    'Poppins-Italic':               require('../assets/fonts/Poppins/Poppins-Italic.ttf'),
    'Poppins-Light':                require('../assets/fonts/Poppins/Poppins-Light.ttf'),
    'Poppins-LightItalic':          require('../assets/fonts/Poppins/Poppins-LightItalic.ttf'),
    'Poppins-Medium':               require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
    'Poppins-MediumItalic':         require('../assets/fonts/Poppins/Poppins-MediumItalic.ttf'),
    'Poppins-Regular':              require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    'Poppins-SemiBold':             require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    'Poppins-SemiBoldItalic':       require('../assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf'),
    'Poppins-Thin':                 require('../assets/fonts/Poppins/Poppins-Thin.ttf'),
    'Poppins-ThinItalic':           require('../assets/fonts/Poppins/Poppins-ThinItalic.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#30C5FF" />
      </View>
    );
  }

  return (
    <AuthProvider>
        <Stack screenOptions={{ headerShown: false }} />;
    </AuthProvider>
    );
  
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
