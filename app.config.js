// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'LazosVet',
    slug: 'LazosVet',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    splash: {
      image: './assets/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      'expo-font',
    ],
    extra: {
      // Aquí inyectamos tu clave de Gemini desde .env
      GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    },
  },
};
