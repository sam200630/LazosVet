import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../styles/petBot/chat';
import { Routes } from '../../route';

// Iconos
import petbotIcon from '../../assets/images/petbot.png';
import addIcon    from '../../assets/images/+.png';
import sendIcon   from '../../assets/images/send.png';
import homeIcon   from '../../assets/images/home.png';
import mediaIcon  from '../../assets/images/media.png';
import perfilIcon from '../../assets/images/perfil.png';

export default function Chat() {
  const router = useRouter();
  const { height } = useWindowDimensions();

  const [messages, setMessages] = useState<string[]>([]);
  const [query, setQuery]       = useState<string>('');

  const handleSend = () => {
    if (!query.trim()) return;
    setMessages(prev => [...prev, query.trim()]);
    setQuery('');
  };

  const tabs = [
    { icon: homeIcon,   label: 'Home',    route: Routes.Home       },
    { icon: petbotIcon, label: 'Pet bot', route: 'petbot/chat'      },
    { icon: mediaIcon,  label: 'Media',   route: Routes.Media      },
    { icon: perfilIcon, label: 'Perfil',  route: Routes.Perfil     },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={petbotIcon} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Pet bot</Text>
      </View>

      {/* Mensajes (flex:1) */}
      <ScrollView
        style={[styles.messagesContainer, { maxHeight: height * 0.65 }]}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.length === 0 ? (
          <Text style={styles.placeholderText}>
            Aquí verás la conversación...
          </Text>
        ) : (
          messages.map((m, i) => (
            <View key={i} style={styles.bubble}>
              <Text style={styles.bubbleText}>{m}</Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Input fijo */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Image source={addIcon} style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Escribe una consulta"
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.iconButton} onPress={handleSend}>
          <Image source={sendIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Bottom Tabs fijo al fondo */}
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
