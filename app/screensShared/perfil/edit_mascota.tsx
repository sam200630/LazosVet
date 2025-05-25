import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import styles, { TAB_BAR_HEIGHT } from '../../../styles/perfil/edit_mascota';
import { CameraModal } from '../../../components/CameraModal';
import { PetsContext, Pet } from '../../../context/PetsContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db, app } from '../../../utils/FirebaseConfig';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import goBackIcon from '../../../assets/images/goBack.png';
import homeIcon   from '../../../assets/images/home.png';
import petbotIcon from '../../../assets/images/petbot.png';
import mediaIcon  from '../../../assets/images/media.png';
import perfilIcon from '../../../assets/images/perfil.png';
import expanderIcon from '../../../assets/images/expander.png';
import { Routes } from '../../../route';

export default function EditMascota() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const petId = params.id as string;

  const { pets } = useContext(PetsContext);
  const [pet, setPet] = useState<Pet | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [age, setAge] = useState('');
  const [ageUnit, setAgeUnit] = useState<'Años'|'Meses'>('Años');
  const [showUnits, setShowUnits] = useState(false);
  const [weight, setWeight] = useState('');
  const [conds, setConds] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const genderOptions = ['Macho','Hembra'];

  useEffect(() => {
    const found = pets.find(p => p.id === petId) || null;
    if (found) {
      setPet(found);
      setName(found.name);
      setBreed(found.breed);
      setGender(found.gender);
      setAge(String(found.age));
      setAgeUnit(found.ageUnit);
      setWeight(String(found.weight));
      setConds(found.conditions);
      // leave photoUri null so we only upload if changed
    }
  }, [pets]);

  const handleAgeChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
    setAge(e.nativeEvent.text.replace(/\D/g,'').slice(0,3));
  const handleWeightChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
    setWeight(e.nativeEvent.text.replace(/[^0-9.]/g,''));

  const isValid = !!(name && breed && gender && age && weight);

  const handleSave = async () => {
    if (!pet) return;
    setLoading(true);
    try {
      // 1) Si hay nueva foto, subirla primero
      let photoUrl: string | undefined;
      if (photoUri) {
        const resp = await fetch(photoUri);
        const blob = await resp.blob();
        const storage = getStorage(app);
        const storageRef = ref(storage, `pets/${petId}/photo.jpg`);
        await uploadBytes(storageRef, blob);
        photoUrl = await getDownloadURL(storageRef);
      }
      // 2) Actualizar Firestore
      const data: any = {
        name: name.trim(),
        breed: breed.trim(),
        gender,
        age: parseInt(age,10),
        ageUnit,
        weight: parseFloat(weight),
        conditions: conds.trim(),
      };
      if (photoUrl) data.photoUrl = photoUrl;
      await updateDoc(doc(db,'pets',petId), data);
      Alert.alert('¡Listo!','Datos actualizados.');
      router.back();
    } catch (e) {
      Alert.alert('Error','No se pudo guardar.');
    } finally {
      setLoading(false);
    }
  };

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
      <CameraModal
        isVisible={modalVisible}
        setImage={asset => {
          setPhotoUri(asset.uri);
          setModalVisible(false);
        }}
        closeModal={() => setModalVisible(false)}
      />

      <TouchableOpacity style={styles.goBack} onPress={() => router.back()}>
        <Image source={goBackIcon} style={styles.goBackIcon}/>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT + 24 }}>
        <Text style={styles.title}>Editar mascota</Text>

        {/* Foto */}
        <View style={styles.profilePicContainer}>
          {photoUri
            ? <Image source={{ uri: photoUri }} style={styles.profilePic}/>
            : pet.photoUrl
              ? <Image source={{ uri: pet.photoUrl }} style={styles.profilePic}/>
              : <View style={styles.profilePic}/>
          }
          <TouchableOpacity style={styles.addPhotoButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.addPhotoText}>Cambiar foto</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nombre"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Raza</Text>
          <TextInput
            style={styles.input}
            value={breed}
            onChangeText={setBreed}
            placeholder="Raza"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Género</Text>
          <View style={styles.selectorWrapper}>
            <TouchableOpacity
              style={styles.selectorContainer}
              onPress={() => setShowGenderDropdown(v=>!v)}
            >
              <Text style={gender ? styles.selectorText : styles.selectorPlaceholder}>
                {gender}
              </Text>
              <Image source={expanderIcon} style={styles.expanderIcon}/>
            </TouchableOpacity>
            {showGenderDropdown && (
              <View style={styles.dropdown}>
                {genderOptions.map(g=>(
                  <TouchableOpacity
                    key={g}
                    style={styles.option}
                    onPress={() => {
                      setGender(g);
                      setShowGenderDropdown(false);
                    }}
                  >
                    <Text style={styles.optionText}>{g}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <Text style={styles.label}>Edad</Text>
          <View style={styles.ageRow}>
            <TextInput
              style={styles.ageLeftInput}
              value={age}
              onChange={handleAgeChange}
              placeholder="Ej: 2"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
            <View style={styles.divider}/>
            <View style={styles.unitWrapper}>
              <TouchableOpacity
                style={styles.unitContainer}
                onPress={() => setShowUnits(u=>!u)}
              >
                <Text style={styles.unitText}>{ageUnit}</Text>
                <Image source={expanderIcon} style={styles.expanderIcon}/>
              </TouchableOpacity>
              {showUnits && (
                <View style={styles.unitDropdown}>
                  {['Años','Meses'].map(u=>(
                    <TouchableOpacity
                      key={u}
                      style={styles.unitOption}
                      onPress={()=>{
                        setAgeUnit(u as any);
                        setShowUnits(false);
                      }}
                    >
                      <Text style={styles.unitOptionText}>{u}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          <Text style={styles.label}>Peso (kg)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChange={handleWeightChange}
            placeholder="Ej: 5"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Condiciones de salud</Text>
          <TextInput
            style={[styles.input, styles.extraInput]}
            value={conds}
            onChangeText={setConds}
            placeholder="Condiciones"
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
          />

          <TouchableOpacity
            style={[styles.button, !isValid && styles.buttonDisabled]}
            disabled={!isValid || loading}
            onPress={handleSave}
          >
            {loading
              ? <ActivityIndicator color="#FFF"/>
              : <Text style={styles.buttonText}>Guardar</Text>
            }
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        {[ homeIcon, petbotIcon, mediaIcon, perfilIcon ].map((icon, i)=>(
          <TouchableOpacity
            key={i}
            style={styles.tabItem}
            onPress={()=>{
              const r = [ Routes.Home, Routes.Petbot, Routes.Media, Routes.Perfil ][i];
              router.replace(r);
            }}
          >
            <Image source={icon} style={styles.tabIcon}/>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}
