import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles, { TAB_BAR_HEIGHT } from '../../styles/perfil/perfil';
import { Routes } from '../../route';

// imágenes estáticas
import goBackIcon   from '../../assets/images/goBack.png';
import personaIcon  from '../../assets/images/persona.png';
import correoIcon   from '../../assets/images/correo.png';
import editarIcon   from '../../assets/images/editar.png';
import pawSmallIcon from '../../assets/images/mascota.png';
import homeIcon     from '../../assets/images/home.png';
import petbotIcon   from '../../assets/images/petbot.png';
import mediaIcon    from '../../assets/images/media.png';
import perfilIcon   from '../../assets/images/perfil.png';

export default function Perfil() {
  const router = useRouter();

  const [editingName, setEditingName]   = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [name, setName]                 = useState('Samuel Rodriguez');
  const [email, setEmail]               = useState('samuel@gmail.com');
  const pets = ['Titán', 'Bela'];

  const tabs = [
    { icon: homeIcon,   label: 'Home',    route: Routes.Home   },
    { icon: petbotIcon, label: 'Pet bot', route: Routes.Home   },
    { icon: mediaIcon,  label: 'Media',   route: Routes.Home   },
    { icon: perfilIcon, label: 'Perfil',  route: Routes.Perfil },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Flecha atrás */}
      <TouchableOpacity
        style={styles.goBack}
        onPress={() => router.replace(Routes.Home)}
      >
        <Image source={goBackIcon} style={styles.goBackIcon} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: TAB_BAR_HEIGHT + 24
        }}
      >
        <Text style={styles.title}>Hello, Samu</Text>

        <View style={styles.profilePicContainer}>
          <View style={styles.profilePic} />
        </View>

        {/* Información personal */}
        <Text style={styles.sectionTitle}>Información personal</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Image source={personaIcon} style={styles.infoIcon} />
            {editingName ? (
              <TextInput
                style={styles.infoInput}
                value={name}
                onChangeText={setName}
              />
            ) : (
              <Text style={styles.infoText}>{name}</Text>
            )}
            <TouchableOpacity onPress={() => setEditingName(!editingName)}>
              <Image source={editarIcon} style={styles.editIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.infoItem}>
            <Image source={correoIcon} style={styles.infoIcon} />
            {editingEmail ? (
              <TextInput
                style={styles.infoInput}
                value={email}
                onChangeText={setEmail}
              />
            ) : (
              <Text style={styles.infoText}>{email}</Text>
            )}
            <TouchableOpacity onPress={() => setEditingEmail(!editingEmail)}>
              <Image source={editarIcon} style={styles.editIcon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Mis mascotas */}
        <Text style={styles.sectionTitle}>Mis mascotas</Text>
        <View style={styles.petsCard}>
          {pets.map((p, i) => (
            <View key={i} style={styles.petRow}>
              <Image source={pawSmallIcon} style={styles.petRowIcon} />
              <Text style={styles.petName}>{p}</Text>
            </View>
          ))}

          {/* Navegar a Añadir mascota */}
          <TouchableOpacity
            style={styles.addPetButton}
            onPress={() => router.push(Routes.AddMascota)}
          >
            <Text style={styles.addPetText}>+ Añadir mascota</Text>
          </TouchableOpacity>
        </View>

        {/* Cerrar sesión */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.replace(Routes.Login)}
        >
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Barra de pestañas inferior */}
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
