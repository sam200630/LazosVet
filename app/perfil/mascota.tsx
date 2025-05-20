import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import styles from '../../styles/perfil/mascota';
import { PetsContext, Pet } from '../../context/PetsContext';
import { DatesContext, DateType } from '../../context/DatesContext';
import { db } from '../../utils/FirebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

import goBackIcon   from '../../assets/images/goBack.png';
import logoIcon     from '../../assets/images/logo.png';
import editIcon     from '../../assets/images/editar.png';
import calendarIcon from '../../assets/images/calendario.png';

type Field = 'breed' | 'gender' | 'age' | 'weight' | 'conditions' | null;

interface Appointment {
  title: string;
  date:  string;
}

export default function Mascota() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const petId = id as string;

  const { pets, loading: loadingPets }   = useContext(PetsContext);
  const { dates, loading: loadingDates } = useContext(DatesContext);

  const [pet, setPet]                         = useState<Pet | null>(null);
  const [nextAppointment, setNextAppointment] = useState<Appointment | null>(null);

  // inline-edit state
  const [editingField, setEditingField] = useState<Field>(null);
  const [editingValue, setEditingValue] = useState<string>('');

  const startEditing = (field: Field, current: string) => {
    setEditingField(field);
    setEditingValue(current);
  };
  const cancelEditing = () => {
    setEditingField(null);
    setEditingValue('');
  };
  const saveEditing = async () => {
    if (!pet || !editingField) return;
    const updates: any = {};
    if (editingField === 'age') {
      updates.age = Number(editingValue.trim());
    } else if (editingField === 'weight') {
      updates.weight = Number(editingValue.trim());
    } else {
      updates[editingField] = editingValue.trim();
    }
    try {
      await updateDoc(doc(db, 'pets', pet.id), updates);
    } catch (err) {
      console.error(err);
    } finally {
      cancelEditing();
    }
  };

  // carga mascota
  useEffect(() => {
    if (!loadingPets) {
      const m = pets.find(p => p.id === petId) || null;
      setPet(m);
    }
  }, [loadingPets, pets, petId]);

  // próxima cita
  useEffect(() => {
    if (!pet || loadingDates) {
      setNextAppointment(null);
      return;
    }
    const now = new Date();
    const ups = dates
      .filter(d => d.petId === pet.id)
      .map(d => ({ ...d, dt: new Date(`${d.date}T${d.time}`) }))
      .filter(d => d.dt >= now)
      .sort((a, b) => a.dt.getTime() - b.dt.getTime());
    if (ups.length) {
      const f = ups[0];
      setNextAppointment({
        title: f.reason,
        date:  f.dt.toLocaleString('es-ES', {
          day:   '2-digit',
          month: 'long',
          hour:  '2-digit',
          minute:'2-digit',
        }),
      });
    }
  }, [pet, dates, loadingDates]);

  if (loadingPets) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#30C5FF" />
      </SafeAreaView>
    );
  }
  if (!pet) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.goBack} onPress={() => router.back()}>
          <Image source={goBackIcon} style={styles.goBackIcon} />
        </TouchableOpacity>
        <Text style={styles.errorText}>Mascota no encontrada</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* logo de fondo */}
      <Image source={logoIcon} style={styles.logo} />

      {/* botón atrás */}
      <TouchableOpacity style={styles.goBack} onPress={() => router.back()}>
        <Image source={goBackIcon} style={styles.goBackIcon} />
      </TouchableOpacity>

      {/* === SECCIÓN 1: IMAGEN y TÍTULO === */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>{pet.name}</Text>
        <View style={styles.imageWrapper}>
          <View style={styles.imageBackground} />
          {pet.photoUrl
            ? <Image source={{ uri: pet.photoUrl }} style={styles.petImage} />
            : <View style={styles.noImagePlaceholder} />
          }
        </View>
      </View>

      {/* === SECCIÓN 2: DATOS en contenedor desplazable === */}
      <ScrollView
        style={styles.dataContainer}
        contentContainerStyle={styles.dataContent}
      >
        {/* Raza */}
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Raza</Text>
          {editingField === 'breed'
            ? <TextInput
                style={styles.textInput}
                value={editingValue}
                onChangeText={setEditingValue}
                autoFocus
              />
            : <Text style={styles.value}>{pet.breed}</Text>
          }
          <TouchableOpacity onPress={() => startEditing('breed', pet.breed)}>
            <Image source={editIcon} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        {editingField === 'breed' && (
          <View style={styles.editRow}>
            <TouchableOpacity onPress={saveEditing}>
              <Text style={styles.saveText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelEditing}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Género */}
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Género</Text>
          <Text style={styles.value}>{pet.gender}</Text>
        </View>

        {/* Edad */}
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Edad</Text>
          {editingField === 'age'
            ? <TextInput
                style={styles.textInput}
                value={editingValue}
                onChangeText={setEditingValue}
                keyboardType="number-pad"
                autoFocus
              />
            : <Text style={styles.value}>
                {pet.age} {pet.ageUnit.toLowerCase()}
              </Text>
          }
          <TouchableOpacity onPress={() => startEditing('age', String(pet.age))}>
            <Image source={editIcon} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        {editingField === 'age' && (
          <View style={styles.editRow}>
            <TouchableOpacity onPress={saveEditing}>
              <Text style={styles.saveText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelEditing}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Peso */}
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Peso</Text>
          {editingField === 'weight'
            ? <TextInput
                style={styles.textInput}
                value={editingValue}
                onChangeText={setEditingValue}
                keyboardType="decimal-pad"
                autoFocus
              />
            : <Text style={styles.value}>{pet.weight} kg</Text>
          }
          <TouchableOpacity onPress={() => startEditing('weight', String(pet.weight))}>
            <Image source={editIcon} style={styles.editIcon} />
          </TouchableOpacity>
        </View>
        {editingField === 'weight' && (
          <View style={styles.editRow}>
            <TouchableOpacity onPress={saveEditing}>
              <Text style={styles.saveText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={cancelEditing}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Condiciones de salud */}
        <Text style={[styles.label, styles.sectionSeparator]}>
          Condiciones de salud
        </Text>
        <View style={styles.conditionsBox}>
          <View style={styles.fieldRow}>
            {editingField === 'conditions'
              ? <TextInput
                  style={[styles.textInput, { flex: 1 }]}
                  value={editingValue}
                  onChangeText={setEditingValue}
                  multiline
                  autoFocus
                />
              : <Text style={styles.conditionsText}>{pet.conditions}</Text>
            }
            <TouchableOpacity onPress={() => startEditing('conditions', pet.conditions)}>
              <Image source={editIcon} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
          {editingField === 'conditions' && (
            <View style={styles.editRow}>
              <TouchableOpacity onPress={saveEditing}>
                <Text style={styles.saveText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={cancelEditing}>
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Próximas citas */}
        <Text style={[styles.label, styles.sectionSeparator]}>
          Próximas citas
        </Text>
        {nextAppointment ? (
          <View style={styles.appointmentBox}>
            <Image source={calendarIcon} style={styles.appointmentIcon} />
            <View style={styles.appointmentInfo}>
              <Text style={styles.appointmentTitle}>{nextAppointment.title}</Text>
              <Text style={styles.appointmentDate}>{nextAppointment.date}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.value}>Sin citas agendadas</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
