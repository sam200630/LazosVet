// app/petBot/chat.tsx

import React, { useState, useContext, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../../../styles/petBot/chat';
import { Routes } from '../../../route';
import BottomTabs from '../../../components/bottonsTab';

// Iconos
import petbotIcon from '../../../assets/images/petbot.png';
import pawIcon    from '../../../assets/images/huellaGrande.png';
import addIcon    from '../../../assets/images/+.png';
import sendIcon   from '../../../assets/images/send.png';
import homeIcon   from '../../../assets/images/home.png';
import mediaIcon  from '../../../assets/images/media.png';
import perfilIcon from '../../../assets/images/perfil.png';

// Contexto y auth
import { PetBotContext } from '../../../context/PetBotContext';
import { auth } from '../../../utils/FirebaseConfig';

export default function Chat() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const userId = auth.currentUser?.uid ?? 'anonymous';

  const {
    messages,
    sendMessage,
    getChats,
    getMessages,
    isLoading: botLoading,
  } = useContext(PetBotContext);

  const [query, setQuery] = useState<string>('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    (async () => {
      await getChats(userId);
      await getMessages(userId, 'PetBot');
    })();
  }, [userId]);

  const handleSend = async () => {
    if (!query.trim() || botLoading) return;
    setSending(true);
    await sendMessage(userId, query.trim());
    setQuery('');
    setSending(false);
  };

  const renderFormatted = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (/^\*\*.*\*\*$/.test(part)) {
        const content = part.slice(2, -2);
        return <Text key={i} style={{ fontWeight: 'bold' }}>{content}</Text>;
      }
      return <Text key={i}>{part}</Text>;
    });
  };

  const tabs = [
    { icon: homeIcon,   route: Routes.Home   },
    { icon: petbotIcon, route: Routes.Petbot },
    { icon: mediaIcon,  route: Routes.Media  },
    { icon: perfilIcon, route: Routes.Perfil },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={petbotIcon} style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Pet bot</Text>
      </View>

      {/* Mensajes */}
      <ScrollView
        style={[styles.messagesContainer, { maxHeight: height * 0.65 }]}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.length === 0
          ? <Text style={styles.placeholderText}>Aquí verás la conversación...</Text>
          : messages.map((m, i) => {
              const isUser = m.sender !== 'bot';
              return (
                <View
                  key={i}
                  style={[
                    styles.bubbleRow,
                    isUser ? styles.bubbleUserRow : styles.bubbleBotRow
                  ]}
                >
                  {isUser && <Image source={pawIcon} style={styles.userAvatar} />}
                  <View style={[
                    styles.bubble,
                    isUser ? styles.bubbleUser : styles.bubbleBot
                  ]}>
                    <View style={styles.bubbleContent}>
                      {renderFormatted(m.text).map((node, idx) => (
                        <React.Fragment key={idx}>{node}</React.Fragment>
                      ))}
                    </View>
                    <Text style={[
                      styles.bubbleMeta,
                      isUser ? styles.bubbleMetaUser : styles.bubbleMetaBot
                    ]}>
                      {isUser
                        ? new Date(m.timestamp).toLocaleTimeString()
                        : `PetBot · ${new Date(m.timestamp).toLocaleTimeString()}`
                      }
                    </Text>
                  </View>
                  {!isUser && <View style={{ width: 32 }} />}
                </View>
              );
            })
        }
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconButton} disabled>
          <Image source={addIcon} style={styles.icon} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Escribe una consulta"
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          editable={!botLoading}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleSend}
          disabled={botLoading || sending}
        >
          {botLoading || sending
            ? <ActivityIndicator />
            : <Image source={sendIcon} style={styles.icon} />
          }
        </TouchableOpacity>
      </View>

      {/* Bottom Tabs */}
      <BottomTabs />
    </SafeAreaView>
  );
}
