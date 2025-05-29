// app/citas/AddAppointment.tsx

import React, { useState, useMemo, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Routes } from '../../../route';
import styles from '../../../styles/citas/add_cita';
import { PetsContext } from '../../../context/PetsContext';  
import { DatesContext } from '../../../context/DatesContext'; 
import BottomTabs from '../../../components/bottonsTab';

// Imports estáticos
import goBackIcon   from '../../../assets/images/goBack.png';
import pawIcon      from '../../../assets/images/huellaGrande.png';
import homeIcon     from '../../../assets/images/home.png';
import petbotIcon   from '../../../assets/images/petbot.png';
import mediaIcon    from '../../../assets/images/media.png';
import perfilIcon   from '../../../assets/images/perfil.png';
import expanderIcon from '../../../assets/images/expander.png';

// Calendario
import { Calendar } from 'react-native-calendars';

export default function AddAppointment() {
  const router = useRouter();

  // Contextos
  const { pets, loading: loadingPets } = useContext(PetsContext);
  const { dates, addDate } = useContext(DatesContext);

  // State del formulario
  const [pet, setPet]       = useState('');
  const [reason, setReason] = useState('');
  const [extra, setExtra]   = useState('');
  const [date, setDate]     = useState('');
  const [time, setTime]     = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading]   = useState(false);           // ← CAMBIO: estado de loading

  // Dropdowns / calendarios
  const [showPetDropdown, setShowPetDropdown]       = useState(false);
  const [showReasonDropdown, setShowReasonDropdown] = useState(false);
  const [showDateCalendar, setShowDateCalendar]     = useState(false);
  const [showTimeDropdown, setShowTimeDropdown]     = useState(false);

  const reasonOptions = ['Baño', 'Consulta', 'Control'];

  // Horas cada 30minuto entre 08:00–17:30
  const timeOptions = useMemo(() => {
    const arr: string[] = [];
    for (let h = 8; h <= 17; h++) {
      ['00', '30'].forEach(m => {
        if (h === 17 && m === '30') {
          arr.push('17:30');
        } else if (h < 17) {
          arr.push(`${String(h).padStart(2,'0')}:${m}`);
        }
      });
    }
    return arr;
  }, []);

  // Filtrar horas en conflicto
  const filteredTimeOptions = timeOptions.map(t => {
    let disabled = false;
    if (date && reason) {
      const conflict = dates.some(d =>
        d.date === date &&
        d.time === t &&
        (
          reason === 'Baño'
            ? d.reason === 'Baño'
            : ['Consulta','Control'].includes(reason)
              ? ['Consulta','Control'].includes(d.reason)
              : false
        )
      );
      disabled = conflict;
    }
    return { time: t, disabled };
  });

  const isValid =
    Boolean(pet && reason && date && time) &&
    !filteredTimeOptions.find(o => o.time === time && o.disabled);

  // Fecha mínima = hoy
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm   = String(today.getMonth()+1).padStart(2,'0');
  const dd   = String(today.getDate()).padStart(2,'0');
  const minDate = `${yyyy}-${mm}-${dd}`;

  const handleDate = async () => {
    setErrorMsg('');
    // Validar conflicto
    const conflict = filteredTimeOptions.find(o => o.time === time && o.disabled);
    if (conflict) {
      setErrorMsg(
        reason === 'Baño'
          ? 'Ya hay un baño agendado para este día y hora.'
          : 'Ya hay una consulta o control agendado para este día y hora.'
      );
      return;
    }

    const selected = pets.find(p => p.name === pet);
    if (!selected) return;

    try {
      setLoading(true);                                      // ← CAMBIO: mostramos loader
      // ← CAMBIO: llamamos a addDate y recogemos el nuevo ID
      const newId = await addDate({
        petId: selected.id,
        reason,
        notes: extra,
        date,
        time,
      });
      
      router.replace(`${Routes.QR}?id=${newId}`);
    } catch (e) {
      console.error(e);
      setErrorMsg('No se pudo agendar la cita. Intenta de nuevo.');
    } finally {
      setLoading(false);                                    
    }
  };

  const tabs = [
    { icon: homeIcon,   label: 'Home',    route: Routes.Home   },
    { icon: petbotIcon, label: 'Pet bot', route: Routes.Home   },
    { icon: mediaIcon,  label: 'Media',   route: Routes.Media  },
    { icon: perfilIcon, label: 'Perfil',  route: Routes.Perfil },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.form}>
        {/* go back */}
        <TouchableOpacity style={styles.goBack} onPress={() => router.back()}>
          <Image source={goBackIcon} style={styles.goBackIcon} />
        </TouchableOpacity>

        {/* footprint */}
        <Image source={pawIcon} style={styles.paw} />

        <Text style={styles.title}>Añadir cita</Text>

        {/* Banner error */}
        {errorMsg ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        ) : null}

        {/* Pet */}
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
              {loadingPets ? (
                <ActivityIndicator size="small" color="#30C5FF" style={{ margin: 16 }} />
              ) : (
                pets.map(p => (
                  <TouchableOpacity
                    key={p.id}
                    style={styles.option}
                    onPress={() => {
                      setPet(p.name);
                      setShowPetDropdown(false);
                      setErrorMsg('');
                    }}
                  >
                    <Text style={styles.optionText}>{p.name}</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}
        </View>

        {/* Reason */}
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
              {['Baño', 'Consulta', 'Control'].map(o => (
                <TouchableOpacity
                  key={o}
                  style={styles.option}
                  onPress={() => {
                    setReason(o);
                    setShowReasonDropdown(false);
                    setErrorMsg('');
                  }}
                >
                  <Text style={styles.optionText}>{o}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Recomendations*/}
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

        {/* Date */}
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
                setErrorMsg('');
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

        {/* Hour */}
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
              {filteredTimeOptions.map(({ time: t, disabled }) => (
                <TouchableOpacity
                  key={t}
                  style={styles.option}
                  disabled={disabled}
                  onPress={() => {
                    setTime(t);
                    setShowTimeDropdown(false);
                    setErrorMsg('');
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      disabled && styles.optionDisabledText
                    ]}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Button */}
        <TouchableOpacity
          style={[styles.button, (!isValid || loading) && styles.buttonDisabled]} 
          disabled={!isValid || loading}                                       
          onPress={handleDate}
        >
          {loading ? (                             
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Generar confirmación</Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Tabs */}
      <BottomTabs />
    </KeyboardAvoidingView>
  );
}
