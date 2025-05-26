// app/perfil/mascota.tsx

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
import styles from '../../../styles/perfil/mascota';
import { PetsContext, Pet } from '../../../context/PetsContext';
import { DatesContext } from '../../../context/DatesContext';
import { db } from '../../../utils/FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import goBackIcon   from '../../../assets/images/goBack.png';
import editIcon     from '../../../assets/images/editar.png';
import calendarIcon from '../../../assets/images/calendario.png';

type Field = 'breed' | 'age' | 'weight' | 'conditions' | null;

export default function Mascota() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const petId = id!;

  const { pets, loading: petsLoading }   = useContext(PetsContext);
  const { dates, loading: datesLoading } = useContext(DatesContext);

  const [pet, setPet] = useState<Pet | null>(null);
  const [nextAppointment, setNextAppointment] = useState<{ title:string; date:string } | null>(null);

  const [editingField, setEditingField] = useState<Field>(null);
  const [editingValue, setEditingValue] = useState('');

  useEffect(() => {
    
      const fetchPet = async () => {
        if (!petId) return;
        const fromContext = pets.find(p => p.id === petId);
        if (fromContext) {
          setPet(fromContext);
        } else {
          try {
            const docRef = doc(db, 'pets', petId);
            const snap = await getDoc(docRef);
            if (snap.exists()) {
              const data = snap.data();
              setPet({ id: snap.id, ...data } as Pet);
            } else {
              setPet(null);
            }
          } catch (e) {
            console.error('Error al cargar mascota desde Firebase:', e);
            setPet(null);
          }
        }
      };
      if (!petsLoading) fetchPet();
}, [petsLoading, petId]);


  useEffect(() => {
    if (!pet || datesLoading) return setNextAppointment(null);
    const now = new Date();
    const upcoming = dates
      .filter(d => d.petId === pet.id)
      .map(d => ({ ...d, dt: new Date(`${d.date}T${d.time}`) }))
      .filter(d => d.dt >= now)
      .sort((a,b) => a.dt.getTime() - b.dt.getTime());
    if (upcoming.length) {
      const f = upcoming[0];
      setNextAppointment({
        title: f.reason,
        date: f.dt.toLocaleString('es-ES',{ day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })
      });
    }
  }, [pet, dates, datesLoading]);

  const startEdit = (field: Field, current: string) => {
    setEditingField(field);
    setEditingValue(current);
  };
  const cancelEdit = () => setEditingField(null);
  const saveEdit = async () => {
    if (!pet || !editingField) return;
    const updates: any = {};
    if (editingField === 'age' || editingField === 'weight') {
      updates[editingField] = Number(editingValue);
    } else {
      updates[editingField] = editingValue;
    }
    await updateDoc(doc(db,'pets',pet.id),updates);
    cancelEdit();
  };

  if (petsLoading) {
    return <SafeAreaView style={styles.loading}><ActivityIndicator size="large" color="#30C5FF"/></SafeAreaView>;
  }
  if (!pet) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.goBack} onPress={() => router.back()}>
          <Image source={goBackIcon} style={styles.goBackIcon}/>
        </TouchableOpacity>
        <Text style={styles.errorText}>Mascota no encontrada</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity style={styles.goBack} onPress={() => router.back()}>
        <Image source={goBackIcon} style={styles.goBackIcon}/>
      </TouchableOpacity>

      <View style={styles.headerSection}>
        <Text style={styles.title}>{pet.name}</Text>
        <View style={styles.imageWrapper}>
          <View style={styles.imageBackground}/>
          {pet.photoUrl
            ? <Image source={{ uri: pet.photoUrl }} style={styles.petImage}/>
            : <View style={styles.noImage}/>
          }
        </View>
      </View>

      <ScrollView style={styles.dataContainer} contentContainerStyle={styles.dataContent}>
        {/* Raza */}
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Raza</Text>
          {editingField==='breed'
            ? <TextInput
                style={styles.textInput}
                value={editingValue}
                onChangeText={setEditingValue}
                autoFocus
              />
            : <Text style={styles.value}>{pet.breed}</Text>
          }
          <TouchableOpacity onPress={() => startEdit('breed',pet.breed)}>
            <Image source={editIcon} style={styles.editIcon}/>
          </TouchableOpacity>
        </View>
        {editingField==='breed' && (
          <View style={styles.editRow}>
            <TouchableOpacity onPress={saveEdit}><Text style={styles.saveText}>Guardar</Text></TouchableOpacity>
            <TouchableOpacity onPress={cancelEdit}><Text style={styles.cancelText}>Cancelar</Text></TouchableOpacity>
          </View>
        )}

        {/* Edad */}
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Edad</Text>
          {editingField==='age'
            ? <TextInput
                style={styles.textInput}
                value={editingValue}
                onChangeText={setEditingValue}
                keyboardType="number-pad"
                autoFocus
              />
            : <Text style={styles.value}>{pet.age} {pet.ageUnit}</Text>
          }
          <TouchableOpacity onPress={() => startEdit('age',String(pet.age))}>
            <Image source={editIcon} style={styles.editIcon}/>
          </TouchableOpacity>
        </View>
        {editingField==='age' && (
          <View style={styles.editRow}>
            <TouchableOpacity onPress={saveEdit}><Text style={styles.saveText}>Guardar</Text></TouchableOpacity>
            <TouchableOpacity onPress={cancelEdit}><Text style={styles.cancelText}>Cancelar</Text></TouchableOpacity>
          </View>
        )}

        {/* Peso */}
        <View style={styles.fieldRow}>
          <Text style={styles.label}>Peso</Text>
          {editingField==='weight'
            ? <TextInput
                style={styles.textInput}
                value={editingValue}
                onChangeText={setEditingValue}
                keyboardType="decimal-pad"
                autoFocus
              />
            : <Text style={styles.value}>{pet.weight} kg</Text>
          }
          <TouchableOpacity onPress={() => startEdit('weight',String(pet.weight))}>
            <Image source={editIcon} style={styles.editIcon}/>
          </TouchableOpacity>
        </View>
        {editingField==='weight' && (
          <View style={styles.editRow}>
            <TouchableOpacity onPress={saveEdit}><Text style={styles.saveText}>Guardar</Text></TouchableOpacity>
            <TouchableOpacity onPress={cancelEdit}><Text style={styles.cancelText}>Cancelar</Text></TouchableOpacity>
          </View>
        )}

        {/* Condiciones */}
        <Text style={[styles.label,styles.sectionSeparator]}>Condiciones</Text>
        <View style={styles.conditionsBox}>
          <View style={styles.fieldRow}>
            {editingField==='conditions'
              ? <TextInput
                  style={[styles.textInput,{flex:1}]}
                  value={editingValue}
                  onChangeText={setEditingValue}
                  multiline
                  autoFocus
                />
              : <Text style={styles.conditionsText}>{pet.conditions}</Text>
            }
            <TouchableOpacity onPress={() => startEdit('conditions',pet.conditions)}>
              <Image source={editIcon} style={styles.editIcon}/>
            </TouchableOpacity>
          </View>
          {editingField==='conditions' && (
            <View style={styles.editRow}>
              <TouchableOpacity onPress={saveEdit}><Text style={styles.saveText}>Guardar</Text></TouchableOpacity>
              <TouchableOpacity onPress={cancelEdit}><Text style={styles.cancelText}>Cancelar</Text></TouchableOpacity>
            </View>
          )}
        </View>

        {/* Próxima cita */}
        <Text style={[styles.label,styles.sectionSeparator]}>Próxima cita</Text>
        {nextAppointment
          ? (
            <View style={styles.appointmentBox}>
              <Image source={calendarIcon} style={styles.appointmentIcon}/>
              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentTitle}>{nextAppointment.title}</Text>
                <Text style={styles.appointmentDate}>{nextAppointment.date}</Text>
              </View>
            </View>
          )
          : <Text style={styles.value}>Sin citas</Text>
        }
      </ScrollView>
    </SafeAreaView>
);
}
