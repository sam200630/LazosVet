// app/citas/AddAppointment.tsx
import React, { useState, useMemo, useContext, useEffect } from 'react';
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

// Importing necessary components and hooks
import { useRouter } from 'expo-router';
import { Routes } from '../../route';
import styles from '../../styles/citas/add_cita';
import { DatesContext } from '../../context/DatesContext';
import { PetsContext } from '../../context/PetsContext';
import { db } from '../../utils/FirebaseConfig';
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

// Importing components from react-native-calendars and other assets
import { Calendar } from 'react-native-calendars';
import BottomTabs from '../../components/bottonsTab';
import goBackIcon from '../../assets/images/goBack.png';
import pawIcon from '../../assets/images/huellaGrande.png';
import homeIcon from '../../assets/images/home.png';
import scanIcon from '../../assets/images/escanear.png';
import mediaIcon from '../../assets/images/media.png';
import perfilIcon from '../../assets/images/perfil.png';
import expanderIcon from '../../assets/images/expander.png';

type Client = { id: string; name: string };

export default function AddAppointment() {
  
  const router = useRouter();
  const { dates } = useContext(DatesContext);
  const { getAllPets } = useContext(PetsContext);

  const [clients, setClients] = useState<Client[]>([]);
  const [clientId, setClientId] = useState('');
  const [client, setClient] = useState('');
  const [loadingClients, setLoadingClients] = useState(true);
  const [showClientDropdown, setShowClientDropdown] = useState(false);

  const [clientPets, setClientPets] = useState<string[]>([]);
  const [loadingClientPets, setLoadingClientPets] = useState(false);
  const [pet, setPet] = useState('');
  const [showPetDropdown, setShowPetDropdown] = useState(false);

  const [reason, setReason] = useState('');
  const [extra, setExtra] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const [showReasonDropdown, setShowReasonDropdown] = useState(false);
  const [showDateCalendar, setShowDateCalendar] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const reasonOptions = ['Baño', 'Consulta', 'Control'];
// Fetching clients from Firestore when the component mounts
  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(collection(db, 'users'));
        const list = snap.docs.map(d => {
          const data = d.data();
          return { id: d.id, name: data.name } as Client;
        });
        setClients(list);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingClients(false);
      }
    })();
  }, []);

  // Fetching pets for the selected client when clientId changes
  useEffect(() => {
    if (!clientId) {
      setClientPets([]);
      return;
    }
    setLoadingClientPets(true);
    (async () => {
      try {
        const all = await getAllPets();
        const filtered = all.filter(p => p.userId === clientId);
        setClientPets(filtered.map(p => p.name));
      } catch (e) {
        console.error(e);
        setClientPets([]);
      } finally {
        setLoadingClientPets(false);
      }
    })();
  }, [clientId]);

  
 // Generating time options from 8:00 to 17:30
  const timeOptions = useMemo(() => {
    const arr: string[] = [];
    for (let h = 8; h <= 17; h++) {
      ['00','30'].forEach(m => {
        if (h === 17 && m === '30') arr.push('17:30');
        else if (h < 17) arr.push(`${String(h).padStart(2,'0')}:${m}`);
      });
    }
    return arr;
  }, []);


// Filtering time options based on selected date and reason
  const filteredTimeOptions = timeOptions.map(t => {
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
    return { time: t, disabled: conflict };
  });

  const isValid =
    Boolean(client && pet && reason && date && time) &&
    !filteredTimeOptions.find(o => o.time === time && o.disabled);

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm   = String(today.getMonth()+1).padStart(2,'0');
  const dd   = String(today.getDate()).padStart(2,'0');
  const minDate = `${yyyy}-${mm}-${dd}`;

// Function to handle date submission
  const handleDate = async () => {
    setErrorMsg('');
    if (filteredTimeOptions.find(o => o.time === time && o.disabled)) {
      setErrorMsg(reason === 'Baño'
        ? 'Ya hay un baño agendado para este día y hora.'
        : 'Ya hay una consulta o control agendado para este día y hora.');
      return;
    }
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db,'dates'), {
        userId: clientId,           // ← ✅ Clave para que el usuario vea la cita
        userName: client,
        petName: pet,
        reason,
        notes: extra,
        date,
        time,
        createdAt: serverTimestamp(),
});

      router.replace(`${Routes.QR}?id=${docRef.id}`);
    } catch (e) {
      console.error(e);
      setErrorMsg('No se pudo agendar la cita. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { icon: homeIcon, label: 'Home', route: Routes.Home },
    { icon: scanIcon, label: 'Escanear', route: Routes.Home },
    { icon: mediaIcon, label: 'Media', route: Routes.Media },
    { icon: perfilIcon, label: 'Perfil', route: Routes.Perfil },
  ];

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.form}>
        <TouchableOpacity style={styles.goBack} onPress={() => router.back()}>
          <Image source={goBackIcon} style={styles.goBackIcon} />
        </TouchableOpacity>
        <Image source={pawIcon} style={styles.paw} />
        <Text style={styles.title}>Añadir cita</Text>

        {errorMsg && <View style={styles.errorBanner}><Text style={styles.errorText}>{errorMsg}</Text></View>}

        {/* CLIENTE */}
        <Text style={styles.label}>Cliente</Text>
        <View style={styles.selectorWrapper}>
          <TouchableOpacity style={styles.selectorContainer} onPress={() => setShowClientDropdown(v => !v)}>
            <Text style={client ? styles.selectorText : styles.selectorPlaceholder}>
              {client || 'Selecciona cliente'}
            </Text>
            <Image source={expanderIcon} style={styles.expanderIcon} />
          </TouchableOpacity>
          {showClientDropdown && (
            <View style={styles.dropdown}>
              {loadingClients
                ? <ActivityIndicator size="small" color="#30C5FF" style={{ margin:16 }}/>
                : clients.map((c, i) => (
                    <TouchableOpacity
                      key={i}
                      style={styles.option}
                      onPress={() => {
                        setClient(c.name);
                        setClientId(c.id);
                        setShowClientDropdown(false);
                        setPet('');
                        setErrorMsg('');
                      }}
                    >
                      <Text style={styles.optionText}>{c.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
          )}
        </View>

        {/* MASCOTA */}
        <Text style={styles.label}>Mascota</Text>
        <View style={styles.selectorWrapper}>
          <TouchableOpacity style={styles.selectorContainer} onPress={() => setShowPetDropdown(v => !v)} disabled={!client}>
            <Text style={pet ? styles.selectorText : styles.selectorPlaceholder}>
              {pet || 'Selecciona mascota'}
            </Text>
            <Image source={expanderIcon} style={styles.expanderIcon} />
          </TouchableOpacity>
          {showPetDropdown && (
            <View style={styles.dropdown}>
              {loadingClientPets
                ? <ActivityIndicator size="small" color="#30C5FF" style={{ margin:16 }}/>
                : clientPets.map((p, i) => (
                    <TouchableOpacity
                      key={i}
                      style={styles.option}
                      onPress={() => {
                        setPet(p);
                        setShowPetDropdown(false);
                        setErrorMsg('');
                      }}
                    >
                      <Text style={styles.optionText}>{p}</Text>
                    </TouchableOpacity>
                ))}
            </View>
          )}
        </View>

                {/* MOTIVO DE LA CITA */}
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
              {reasonOptions.map((o, i) => (
                <TouchableOpacity
                  key={i}
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

        {/* RECOMENDACIONES ADICIONALES */}
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

        {/* FECHA */}
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
              markedDates={date ? { [date]: { selected:true } } : {}}
              theme={{
                arrowColor:'#A15E49',
                todayTextColor:'#30C5FF',
                selectedDayBackgroundColor:'#30C5FF',
              }}
              style={styles.calendar}
            />
          )}
        </View>

        {/* HORA */}
        <Text style={styles.label}>Horario de 8:00am-17:30pm</Text>
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
              {filteredTimeOptions.map(({ time: t, disabled }, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.option}
                  disabled={disabled}
                  onPress={() => {
                    setTime(t);
                    setShowTimeDropdown(false);
                    setErrorMsg('');
                  }}
                >
                  <Text style={[styles.optionText, disabled && styles.optionDisabledText]}>
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* BOTÓN DE CONFIRMACIÓN */}
        <TouchableOpacity
          style={[styles.button, (!isValid || loading) && styles.buttonDisabled]}
          disabled={!isValid || loading}
          onPress={handleDate}
        >
          {loading
            ? <ActivityIndicator color="#FFF" />
            : <Text style={styles.buttonText}>Generar confirmación</Text>
          }
        </TouchableOpacity>

      </ScrollView>
      <BottomTabs />
    </KeyboardAvoidingView>
  );
}
