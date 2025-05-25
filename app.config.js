// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'LazosVet',
    slug: 'LazosVet',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,

    splash: {
      image: './assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },

    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.andreysamu.lazosvet', // ← ¡Modifica con tu ID único!
    },

    android: {
      package: 'com.andreysamu.lazosvet', // ← ¡Mismo aquí!
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
    },

    web: {
      favicon: './assets/images/favicon.png',
    },

    plugins: [
      'expo-font',
      'expo-camera',
      'expo-dev-client', // ← Necesario para builds con EAS Dev Client
    ],

    extra: {
      GEMINI_API_KEY: process.env.GEMINI_API_KEY,
      eas: {
        projectId: '5f783341-dc3b-46b5-a825-7723c610f719',
      },
    },
  },
};
