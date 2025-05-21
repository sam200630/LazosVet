import React, { createContext, useState, useEffect, ReactNode } from 'react';
import Constants from 'expo-constants';
import { doc, setDoc, getDocs, getDoc, collection, updateDoc, arrayUnion, deleteDoc } from 'firebase/firestore';
import { db } from '../utils/FirebaseConfig';
import { Message } from '../interfaces/AppInterfaces';
import { generateFromGemini } from '../app/services/geminiService';

// Define interface for context
interface PetBotContextProps {
  messages: Message[];
  chats: { id: string; title: string }[];
  isLoading: boolean;
  getChats: (userId: string) => Promise<void>;
  getMessages: (userId: string, title: string) => Promise<void>;
  sendMessage: (userId: string, text: string) => Promise<void>;
  clearConversations: (userId: string) => Promise<void>;
  handleClearChats: (userId: string) => Promise<void>;
}

export const PetBotContext = createContext<PetBotContextProps>({} as PetBotContextProps);

export const PetBotProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<{ id: string; title: string }[]>([]);
  const [currentChatTitle, setCurrentChatTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load chats
  const getChats = async (userId: string) => {
    const chatsCol = collection(db, `chats/${userId}/titles`);
    const snapshot = await getDocs(chatsCol);
    const list = snapshot.docs.map(d => ({ id: d.id, title: d.data().title }));
    setChats(list);
  };

  // Load messages for a chat
  const getMessages = async (userId: string, title: string) => {
    try {
      const ref = doc(db, `chats/${userId}/titles`, title);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setMessages(snap.data().messages || []);
      } else {
        setMessages([]);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  // Save message
  const saveMessageToFirebase = async (userId: string, title: string, msg: Message) => {
    const ref = doc(db, `chats/${userId}/titles`, title);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, { title, messages: [msg] });
    } else {
      await updateDoc(ref, { messages: arrayUnion(msg) });
    }
  };

  // Send message and get response
  const sendMessage = async (userId: string, text: string) => {
    if (!text.trim()) return;
    let title = currentChatTitle;
    if (!title) {
      title = text.split(' ').slice(0, 4).join(' ');
      setCurrentChatTitle(title);
    }
    const userMsg: Message = { text, sender: userId, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    await saveMessageToFirebase(userId, title, userMsg);

    try {
      setIsLoading(true);
      const replyText = await generateFromGemini(text);
      const botMsg: Message = { text: replyText, sender: 'bot', timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, botMsg]);
      await saveMessageToFirebase(userId, title, botMsg);
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear all conversations
  const clearConversations = async (userId: string) => {
    try {
      const titlesRef = collection(db, `chats/${userId}/titles`);
      const snapshot = await getDocs(titlesRef);
      const deletes = snapshot.docs.map(d => deleteDoc(d.ref));
      await Promise.all(deletes);
      setChats([]);
      setMessages([]);
    } catch (err) {
      console.error('Error clearing conversations:', err);
    }
  };

  const handleClearChats = async (userId: string) => {
    await clearConversations(userId);
    await getChats(userId);
    setCurrentChatTitle('');
  };

  return (
    <PetBotContext.Provider
      value={{
        messages,
        chats,
        isLoading,
        getChats,
        getMessages,
        sendMessage,
        clearConversations,
        handleClearChats,
      }}>
      {children}
    </PetBotContext.Provider>
  );
};
