// app/admin/detalles-cita.tsx
import { useNavigation } from 'expo-router';
import { useEffect } from 'react';
import DetallesCita from '../user/citas/detalles';

export default function detallesCitaQR() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: 'none' } });
  }, []);

  return <DetallesCita />;
}
