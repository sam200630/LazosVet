import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { Routes } from '../../route';
import styles from '../../styles/citas/add_cita';

// Imports estáticos
import goBackIcon from '../../assets/images/goBack.png';
import pawIcon    from '../../assets/images/huellaGrande.png';
import homeIcon   from '../../assets/images/home.png';
import petbotIcon from '../../assets/images/petbot.png';
import mediaIcon  from '../../assets/images/media.png';
import perfilIcon from '../../assets/images/perfil.png';

export default function AddAppointment() {
  const router = useRouter();
  const [pet, setPet] = useState('');
  const [reason, setReason] = useState('');
  const [extra, setExtra] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // AUTO-FORMAT Y VALIDACIÓN DE FECHA
  const handleDateChange = (text: string) => {
    // solo dígitos
    const digits = text.replace(/\D/g, '').slice(0, 8);
    let result = '';
    if (digits.length > 0) {
      result += digits.slice(0, Math.min(4, digits.length));
    }
    if (digits.length >= 5) {
      result += '-' + digits.slice(4, Math.min(6, digits.length));
    } else if (digits.length > 4) {
      result += '-' + digits.slice(4);
    }
    if (digits.length >= 7) {
      result += '-' + digits.slice(6);
    }
    setDate(result);
  };
  const isDateFormatValid = /^\d{4}-\d{2}-\d{2}$/.test(date);
  const dateParts = date.split('-').map(n => parseInt(n, 10));
  const dateValid = isDateFormatValid && (() => {
    const [y, m, d] = dateParts;
    if (m < 1 || m > 12) return false;
    const maxDay = new Date(y, m, 0).getDate();
    return d >= 1 && d <= maxDay;
  })();

  // AUTO-FORMAT Y VALIDACIÓN DE HORA MILITAR 08:00–18:00
  const handleTimeChange = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 4);
    let result = digits;
    if (digits.length >= 3) {
      result = digits.slice(0,2) + ':' + digits.slice(2);
    }
    setTime(result);
  };
  const isTimeFormatValid = /^[0-2]\d:[0-5]\d$/.test(time);
  const timeValid = isTimeFormatValid && (() => {
    const [h, m] = time.split(':').map(n => parseInt(n,10));
    return h >= 8 && h <= 18;
  })();

  const isValid = pet !== '' && reason !== '' && dateValid && timeValid;

  const tabs = [
    { icon: homeIcon,   label: 'Home',    route: Routes.Home },
    { icon: petbotIcon, label: 'Pet bot', route: Routes.Home },
    { icon: mediaIcon,  label: 'Media',   route: Routes.Home },
    { icon: perfilIcon, label: 'Perfil',  route: Routes.Perfil },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Flecha atrás */}
      <TouchableOpacity style={styles.goBack} onPress={() => router.back()}>
        <Image source={goBackIcon} style={styles.goBackIcon} />
      </TouchableOpacity>

      {/* Huella grande */}
      <Image source={pawIcon} style={styles.paw} />

      <Text style={styles.title}>Añadir cita</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Mascota</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={pet}
            onValueChange={setPet}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona mascota" value="" />
            <Picker.Item label="Titán" value="Titán" />
            <Picker.Item label="Milu"  value="Milu" />
            <Picker.Item label="Bela"  value="Bela" />
          </Picker>
        </View>

        <Text style={styles.label}>Motivo de la cita</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={reason}
            onValueChange={setReason}
            style={styles.picker}
          >
            <Picker.Item label="Selecciona motivo" value="" />
            <Picker.Item label="Baño"      value="Baño" />
            <Picker.Item label="Consulta"  value="Consulta" />
            <Picker.Item label="Control"   value="Control" />
          </Picker>
        </View>

        <Text style={styles.label}>Recomendaciones adicionales</Text>
        <TextInput
          style={[styles.input, styles.extraInput]}
          placeholder="Este espacio es opcional"
          placeholderTextColor="#999"
          multiline
          numberOfLines={3}
          value={extra}
          onChangeText={setExtra}
        />

        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>Fecha (YYYY-MM-DD)</Text>
            <TextInput
              style={[
                styles.input,
                date.length === 10 && !dateValid ? { borderColor: 'red' } : {},
              ]}
              placeholder="2025-05-30"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={date}
              onChangeText={handleDateChange}
            />
          </View>
          <View style={styles.half}>
            <Text style={styles.label}>Hora (HH:MM)</Text>
            <TextInput
              style={[
                styles.input,
                time.length === 5 && !timeValid ? { borderColor: 'red' } : {},
              ]}
              placeholder="14:30"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={time}
              onChangeText={handleTimeChange}
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, !isValid && styles.buttonDisabled]}
          disabled={!isValid}
          onPress={() => {/* Generar confirmación */}}
        >
          <Text style={styles.buttonText}>Generar confirmación</Text>
        </TouchableOpacity>
      </View>

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
    </KeyboardAvoidingView>
  );
}
