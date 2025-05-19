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
} from 'firebase/firestore';
import { AuthContext } from './AuthContext';
import { PetsContext, Pet } from './PetsContext';

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
  petOptions: Pet[];  // para el dropdown de mascotas
  addDate: (data: {
    petId: string;
    reason: string;
    notes?: string;
    date: string;
    time: string;
  }) => Promise<void>;
  refreshDates: () => void;
}

export const DatesContext = createContext<DatesContextType>({
  dates: [],
  loading: true,
  petOptions: [],
  addDate: async () => {},
  refreshDates: () => {},
});

export const DatesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useContext(AuthContext);
  const { pets } = useContext(PetsContext);
  const [dates, setDates] = useState<DateType[]>([]);
  const [loading, setLoading] = useState(true);

  // escucha real-time de citas (dates) para este usuario
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

  // función para agregar una nueva cita
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
  }) => {
    if (!user) throw new Error('Usuario no autenticado');
    // buscar nombre de la mascota seleccionada
    const pet = pets.find(p => p.id === petId);
    const petName = pet ? pet.name : '';
    // crea documento en "dates"
    await addDoc(collection(db, 'dates'), {
      userId: user.uid,
      petId,
      petName,
      reason,
      notes,
      date,
      time,
      createdAt: serverTimestamp(),
    });
    // onSnapshot auto-refresca la lista
  };

  const refreshDates = () => {
    // el onSnapshot ya trae datos en tiempo real,
    // pero proporcionamos este método por si lo necesitas manualmente
    // (p. ej. tras eliminar o editar)
    setLoading(true);
    // no-op: onSnapshot se encarga
  };

  return (
    <DatesContext.Provider
      value={{ dates, loading, petOptions: pets, addDate, refreshDates }}
    >
      {children}
    </DatesContext.Provider>
  );
};
