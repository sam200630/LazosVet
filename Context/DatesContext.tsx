// context/DatesContext.tsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../utils/FirebaseConfig';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  DocumentData,
  getDocs,
} from 'firebase/firestore';

import { AuthContext } from './AuthContext';
import { PetsContext, Pet } from './PetsContext';
import { scheduleReminder } from '../app/services/Notifications';  // ← CAMBIO: importamos

export interface DateType {
  id: string;
  petId: string;
  petName: string;
  reason: string;
  notes: string;
  date: string;   // e.g. '2025-06-01'
  time: string;   // e.g. '14:30'
}

export interface DatesContextType {
  dates: DateType[];
  loading: boolean;
  petOptions: Pet[];
  addDate: (data: {
    petId: string;
    reason: string;
    notes?: string;
    date: string;
    time: string;
  }) => Promise<string>;  // ← retorna el ID de la cita
  refreshDates: () => void;
  OtherDates: () => Promise<DateType[]>;
}

export const DatesContext = createContext<DatesContextType>({
  dates: [],
  loading: true,
  petOptions: [],
  addDate: async () => '',       
  refreshDates: () => {},
  OtherDates: async () => [],
});

export const DatesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { pets } = useContext(PetsContext);
  const [dates, setDates] = useState<DateType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setDates([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const q = query(
      collection(db, 'dates'),
      where('userId', '==', user.uid)
    );
    const unsubscribe = onSnapshot(q, snap => {
      const arr: DateType[] = snap.docs.map(d => {
        const data = d.data() as DocumentData;
        return {
          id: d.id,
          petId: data.petId,
          petName: data.petName,
          reason: data.reason,
          notes: data.notes || '',
          date: data.date,
          time: data.time,
        };
      });
      setDates(arr);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const addDate = async ({
    petId,
    reason,
    notes = '',
    date,
    time,
  }: {
    petId: string;
    reason: string;
    notes?: string;
    date: string;
    time: string;
  }): Promise<string> => {
    if (!user) throw new Error('Usuario no autenticado');
    const pet = pets.find(p => p.id === petId);
    const petName = pet ? pet.name : '';

    // 1️⃣ Crear la cita en Firestore
    const docRef = await addDoc(collection(db, 'dates'), {
      userId: user.uid,
      petId,
      petName,
      reason,
      notes,
      date,
      time,
      createdAt: serverTimestamp(),
    });
    const newId = docRef.id;  // ← CAMBIO: guardamos el ID

    // 2️⃣ Programar notificación local 24h antes
    try {
      await scheduleReminder(
        petName,
        reason,
      );
    } catch (e) {
      console.warn('Error al programar recordatorio:', e);
    }

    return newId;  // ← CAMBIO: devolvemos el ID
  };

  const refreshDates = () => {
    setLoading(true);
  };

  const OtherDates = async (): Promise<DateType[]> => {
    if (!user) throw new Error('Usuario no autenticado');
    const q = query(collection(db, 'dates'), where('userId', '==', user.uid));
    const snap = await getDocs(q);

    const citas: DateType[] = snap.docs.map(d => {
      const data = d.data() as DocumentData;
      return {
        id: d.id,
        petId: data.petId,
        petName: data.petName,
        reason: data.reason,
        notes: data.notes || '',
        date: data.date,
        time: data.time,
      };
    });

    const sorted = [...citas].sort((a, b) => {
      const aDate = new Date(`${a.date}T${a.time}`);
      const bDate = new Date(`${b.date}T${b.time}`);
      return aDate.getTime() - bDate.getTime();
    });

    return sorted.slice(1);
  };

  return (
    <DatesContext.Provider
      value={{ dates, loading, petOptions: pets, addDate, refreshDates, OtherDates }}
    >
      {children}
    </DatesContext.Provider>
  );
};
