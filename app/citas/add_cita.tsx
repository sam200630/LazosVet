import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Routes } from '../../route';
import styles from '../../styles/citas/add_cita';

// Imports estáticos
import goBackIcon   from '../../assets/images/goBack.png';
import pawIcon      from '../../assets/images/huellaGrande.png';
import homeIcon     from '../../assets/images/home.png';
import petbotIcon   from '../../assets/images/petbot.png';
import mediaIcon    from '../../assets/images/media.png';
import perfilIcon   from '../../assets/images/perfil.png';
import expanderIcon from '../../assets/images/expander.png';

export default function AddAppointment() {
  const router = useRouter();
  const [pet, setPet] = useState('');
  const [reason, setReason] = useState('');
  const [extra, setExtra] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [showPetDropdown, setShowPetDropdown] = useState(false);
  const [showReasonDropdown, setShowReasonDropdown] = useState(false);
  const petOptions = ['Titán', 'Milu', 'Bela'];
  const reasonOptions = ['Baño', 'Consulta', 'Control'];

  // get today's date at midnight
  const today = new Date();
  today.setHours(0,0,0,0);

  // AUTO-FORMAT y bloqueo de fechas anteriores
  const handleDateChange = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 8);
    let result = '';
    if (digits.length > 0) result += digits.slice(0, 4);
    if (digits.length >= 5) result += '-' + digits.slice(4, 6);
    if (digits.length >= 7) result += '-' + digits.slice(6, 8);
    // si ya tiene formato completo, validar no anterior a hoy
    if (result.length === 10) {
      const [y, m, d] = result.split('-').map(n => parseInt(n,10));
      const picked = new Date(y, m - 1, d);
      if (picked < today) {
        return; // no actualizar
      }
    }
    setDate(result);
  };
  const isDateValid = /^\d{4}-\d{2}-\d{2}$/.test(date) && (() => {
    const [y, m, d] = date.split('-').map(n => parseInt(n,10));
    if (m < 1 || m > 12) return false;
    const md = new Date(y, m, 0).getDate();
    return d >= 1 && d <= md;
  })();

  // AUTO-FORMAT y validación de hora 08:00–17:30
  const handleTimeChange = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 4);
    let result = digits;
    if (digits.length >= 3) result = digits.slice(0, 2) + ':' + digits.slice(2);
    setTime(result);
  };
  const isTimeValid = /^[0-2]\d:[0-5]\d$/.test(time) && (() => {
    const [h, m] = time.split(':').map(n => parseInt(n,10));
    if (h < 8 || h > 17) return false;
    if (h === 17 && m > 30) return false;
    return true;
  })();

  const isValid = !!(pet && reason && isDateValid && isTimeValid);

  const tabs = [
    { icon: homeIcon,   label: 'Home',    route: Routes.Home   },
    { icon: petbotIcon, label: 'Pet bot', route: Routes.Home   },
    { icon: mediaIcon,  label: 'Media',   route: Routes.Home   },
    { icon: perfilIcon, label: 'Perfil',  route: Routes.Perfil },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.form}>
        {/* Flecha atrás */}
        <TouchableOpacity style={styles.goBack} onPress={() => router.back()}>
          <Image source={goBackIcon} style={styles.goBackIcon} />
        </TouchableOpacity>

        {/* Huella grande */}
        <Image source={pawIcon} style={styles.paw} />

        <Text style={styles.title}>Añadir cita</Text>

        {/* Mascota */}
        <Text style={styles.label}>Mascota</Text>
        <View style={styles.selectorWrapper}>
          <TouchableOpacity
            style={styles.selectorContainer}
            onPress={() => setShowPetDropdown(v => !v)}
          >
            <Text style={pet ? styles.selectorText : styles.selectorPlaceholder}>
              {pet || 'Selecciona mascota'}
            </Text>
            <Image source={expanderIcon} style={styles.expanderIcon} />
          </TouchableOpacity>
          {showPetDropdown && (
            <View style={styles.dropdown}>
              {petOptions.map(o => (
                <TouchableOpacity
                  key={o}
                  style={styles.option}
                  onPress={() => { setPet(o); setShowPetDropdown(false); }}
                >
                  <Text style={styles.optionText}>{o}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Motivo */}
        <Text style={styles.label}>Motivo de la cita</Text>
        <View style={styles.selectorWrapper}>
          <TouchableOpacity
            style={styles.selectorContainer}
            onPress={() => setShowReasonDropdown(v => !v)}
          >
            <Text style={reason ? styles.selectorText : styles.selectorPlaceholder}>
              {reason || 'Selecciona motivo'}
            </Text>
            <Image source={expanderIcon} style={styles.expanderIcon} />
          </TouchableOpacity>
          {showReasonDropdown && (
            <View style={styles.dropdown}>
              {reasonOptions.map(o => (
                <TouchableOpacity
                  key={o}
                  style={styles.option}
                  onPress={() => { setReason(o); setShowReasonDropdown(false); }}
                >
                  <Text style={styles.optionText}>{o}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Recomendaciones */}
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

        {/* Fecha & Hora */}
        <View style={styles.row}>
          <View style={styles.half}>
            <Text style={styles.label}>Fecha (YYYY-MM-DD)</Text>
            <TextInput
              style={[
                styles.input,
                date.length === 10 && !isDateValid ? { borderColor: 'red' } : {},
              ]}
              placeholder="2025-05-30"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={date}
              onChangeText={handleDateChange}
            />
          </View>
          <View style={styles.half}>
            <Text style={styles.label}>Hora</Text>
            <TextInput
              style={[
                styles.input,
                time.length === 5 && !isTimeValid ? { borderColor: 'red' } : {},
              ]}
              placeholder="Horario de 8:00am-5:30pm"
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
      </ScrollView>

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
