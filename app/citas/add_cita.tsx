import React, { useState, useMemo } from 'react';
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

// Calendario
import { Calendar } from 'react-native-calendars';

export default function AddAppointment() {
  const router = useRouter();
  const [pet, setPet]       = useState('');
  const [reason, setReason] = useState('');
  const [extra, setExtra]   = useState('');
  const [date, setDate]     = useState('');
  const [time, setTime]     = useState('');

  const [showPetDropdown, setShowPetDropdown]       = useState(false);
  const [showReasonDropdown, setShowReasonDropdown] = useState(false);
  const [showDateCalendar, setShowDateCalendar]     = useState(false);
  const [showTimeDropdown, setShowTimeDropdown]     = useState(false);

  const petOptions    = ['Titán', 'Milu', 'Bela'];
  const reasonOptions = ['Baño', 'Consulta', 'Control'];

  // Generar horas cada 30min
  const timeOptions = useMemo(() => {
    const arr: string[] = [];
    for (let h = 8; h <= 17; h++) {
      ['00', '30'].forEach(m => {
        if (h === 17 && m === '30') {
          arr.push('17:30');
        } else if (h < 17) {
          arr.push(`${String(h).padStart(2, '0')}:${m}`);
        }
      });
    }
    return arr;
  }, []);

  const isDateValid = Boolean(date);
  const isTimeValid = timeOptions.includes(time);
  const isValid     = Boolean(pet && reason && isDateValid && isTimeValid);

  const tabs = [
    { icon: homeIcon,   label: 'Home',    route: Routes.Home   },
    { icon: petbotIcon, label: 'Pet bot', route: Routes.Home   },
    { icon: mediaIcon,  label: 'Media',   route: Routes.Home   },
    { icon: perfilIcon, label: 'Perfil',  route: Routes.Perfil },
  ];

  // Fecha mínima = hoy
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm   = String(today.getMonth()+1).padStart(2,'0');
  const dd   = String(today.getDate()).padStart(2,'0');
  const minDate = `${yyyy}-${mm}-${dd}`;

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
          onChangeText={setExtra}
          value={extra}
        />

        {/* Fecha como calendario */}
        <Text style={styles.label}>Fecha</Text>
        <View style={styles.calendarWrapper}>
          <TouchableOpacity
            style={styles.selectorContainer}
            onPress={() => setShowDateCalendar(v => !v)}
          >
            <Text style={date ? styles.selectorText : styles.selectorPlaceholder}>
              {date || 'Selecciona fecha'}
            </Text>
            <Image source={expanderIcon} style={styles.expanderIcon} />
          </TouchableOpacity>
          {showDateCalendar && (
            <Calendar
              onDayPress={day => {
                setDate(day.dateString);
                setShowDateCalendar(false);
              }}
              minDate={minDate}
              markedDates={date ? { [date]: { selected: true } } : {}}
              theme={{
                arrowColor: '#A15E49',
                todayTextColor: '#30C5FF',
                selectedDayBackgroundColor: '#30C5FF',
              }}
              style={styles.calendar}
            />
          )}
        </View>

        {/* Hora */}
        <Text style={styles.label}>Horario de 8:00am-5:30pm</Text>
        <View style={styles.selectorWrapper}>
          <TouchableOpacity
            style={styles.selectorContainer}
            onPress={() => setShowTimeDropdown(v => !v)}
          >
            <Text style={time ? styles.selectorText : styles.selectorPlaceholder}>
              {time || 'Selecciona hora'}
            </Text>
            <Image source={expanderIcon} style={styles.expanderIcon} />
          </TouchableOpacity>
          {showTimeDropdown && (
            <View style={styles.dropdown}>
              {timeOptions.map(t => (
                <TouchableOpacity
                  key={t}
                  style={styles.option}
                  onPress={() => { setTime(t); setShowTimeDropdown(false); }}
                >
                  <Text style={styles.optionText}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Botón */}
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
