// app/services/Notifications.ts

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { SchedulableTriggerInputTypes } from 'expo-notifications';

// Handler notifications
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert:  true,
    shouldPlaySound:  false,
    shouldSetBadge:   false,
    shouldShowBanner: true,
    shouldShowList:   true,
  }),
});

// Initialize notifications
export async function initNotifications() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    if (newStatus !== 'granted') {
      console.warn('Permisos de notificaciones no concedidos');
    }
  }
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }
}

// Schedule a test reminder notification
export async function scheduleReminder(petName: string, reason: string
): Promise<string> {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: '🕒 Recordatorio cita',
      body:  `Recuerda que mañana es tu cita de ${reason} de ${petName}`,
    },
    trigger: {
      type:    SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 60,
      repeats: false,
    },
  });
  console.log(`⏱ Test reminder scheduled in 60s (id=${id})`);
  return id;
}
