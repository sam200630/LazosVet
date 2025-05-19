import React, { useState, useContext } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles, { TAB_BAR_HEIGHT } from '../../styles/perfil/add_mascota';
import { Routes } from '../../route';
import { CameraModal } from '../../components/CameraModal';
import { PetsContext } from '../../context/PetsContext';

// íconos...
import goBackIcon from '../../assets/images/goBack.png';
import homeIcon from '../../assets/images/home.png';
import petbotIcon from '../../assets/images/petbot.png';
import mediaIcon from '../../assets/images/media.png';
import perfilIcon from '../../assets/images/perfil.png';
import expanderIcon from '../../assets/images/expander.png';

export default function AddMascota() {
  const router = useRouter();
  const { addPet } = useContext(PetsContext);

  // Form state
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [age, setAge] = useState('');
  const [ageUnit, setAgeUnit] = useState<'Años' | 'Meses'>('Años');
  const [showUnits, setShowUnits] = useState(false);
  const [weight, setWeight] = useState('');
  const [conds, setConds] = useState('');

  // Photo
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const genderOptions = ['Macho', 'Hembra'];
  const isValid = !!(name && breed && gender && age && weight);

  const handleAgeChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
    setAge(e.nativeEvent.text.replace(/\D/g, '').slice(0, 3));
  const handleWeightChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
    setWeight(e.nativeEvent.text.replace(/\D/g, '').slice(0, 5));

  const handleSubmit = async () => {
    await addPet({
      name,
      breed,
      gender,
      age: parseInt(age, 10),
      ageUnit,
      weight: parseFloat(weight),
      conditions: conds,
      photoLocalUri: photoUri || undefined,
    });
    router.replace(Routes.Home);
  };

  const tabs = [
    { icon: homeIcon, label: 'Home', route: Routes.Home },
    { icon: petbotIcon, label: 'Pet bot', route: Routes.Home },
    { icon: mediaIcon, label: 'Media', route: Routes.Media },
    { icon: perfilIcon, label: 'Perfil', route: Routes.Perfil },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <CameraModal
        isVisible={modalVisible}
        setImage={(asset) => {
          setPhotoUri(asset.uri);
          setModalVisible(false);
        }}
        closeModal={() => setModalVisible(false)}
      />

      <TouchableOpacity
        style={styles.goBack}
        onPress={() => router.replace(Routes.Perfil)}
      >
        <Image source={goBackIcon} style={styles.goBackIcon} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: TAB_BAR_HEIGHT + 24 }}>
        <Text style={styles.title}>Añadir mascota</Text>

        {/* Foto mascota */}
        <View style={styles.profilePicContainer}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.profilePic} />
          ) : (
            <View style={styles.profilePic} />
          )}
          <TouchableOpacity
            style={styles.addPhotoButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addPhotoText}>+ Foto</Text>
          </TouchableOpacity>
        </View>

        {/* Formulario */}
        <View style={styles.form}>
          {/* Nombre */}
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Pelusa"
            placeholderTextColor="#999"
            value={name}
            onChangeText={setName}
          />

          {/* Raza */}
          <Text style={styles.label}>Raza</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Labrador"
            placeholderTextColor="#999"
            value={breed}
            onChangeText={setBreed}
          />

          {/* Género */}
          <Text style={styles.label}>Género</Text>
          <View style={styles.selectorWrapper}>
            <TouchableOpacity
              style={styles.selectorContainer}
              onPress={() => setShowGenderDropdown(v => !v)}
            >
              <Text style={gender ? styles.selectorText : styles.selectorPlaceholder}>
                {gender || 'Selecciona género'}
              </Text>
              <Image source={expanderIcon} style={styles.expanderIcon} />
            </TouchableOpacity>
            {showGenderDropdown && (
              <View style={styles.dropdown}>
                {genderOptions.map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={styles.option}
                    onPress={() => {
                      setGender(opt);
                      setShowGenderDropdown(false);
                    }}
                  >
                    <Text style={styles.optionText}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Edad */}
          <Text style={styles.label}>Edad</Text>
          <View style={styles.ageRow}>
            <TextInput
              style={styles.ageLeftInput}
              placeholder="Ej: 2"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={age}
              onChange={handleAgeChange}
            />
            <View style={styles.divider} />
            <View style={styles.unitWrapper}>
              <TouchableOpacity
                style={styles.unitContainer}
                onPress={() => setShowUnits(u => !u)}
                activeOpacity={0.8}
              >
                <Text style={styles.unitText}>{ageUnit}</Text>
                <Image source={expanderIcon} style={styles.expanderIcon} />
              </TouchableOpacity>
              {showUnits && (
                <View style={styles.unitDropdown}>
                  {['Años', 'Meses'].map(u => (
                    <TouchableOpacity
                      key={u}
                      style={styles.unitOption}
                      onPress={() => {
                        setAgeUnit(u as 'Años' | 'Meses');
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

          {/* Peso */}
          <Text style={styles.label}>Peso (kg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 5"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={weight}
            onChange={handleWeightChange}
          />

          {/* Condiciones */}
          <Text style={styles.label}>Condiciones de salud</Text>
          <TextInput
            style={[styles.input, styles.extraInput]}
            placeholder="Añadir condiciones"
            placeholderTextColor="#999"
            multiline
            numberOfLines={3}
            value={conds}
            onChangeText={setConds}
          />

          <TouchableOpacity
            style={[styles.button, !isValid && styles.buttonDisabled]}
            disabled={!isValid}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Añadir mascota +</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Tab bar */}
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
    </SafeAreaView>
  );
}
