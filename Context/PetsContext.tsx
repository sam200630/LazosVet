// context/PetsContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { db, app } from '../utils/FirebaseConfig';
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  setDoc,
  doc as firestoreDoc,
  getDocs,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { AuthContext } from './AuthContext';

export interface Pet {
  id: string;
  name: string;
  animalType: string;
  breed: string;
  gender: string;
  age: number;
  ageUnit: 'Años' | 'Meses';
  weight: number;
  conditions: string;
  photoUrl: string | null;
  userId: string; // ← añadido aquí
}

export interface PetsContextType {
  pets: Pet[];
  loading: boolean;
  addPet: (
    petData: Omit<Pet, 'id' | 'photoUrl'> & { photoLocalUri?: string }
  ) => Promise<void>;
  getAllPets: () => Promise<Pet[]>;
}

export const PetsContext = createContext<PetsContextType>({
  pets: [],
  loading: true,
  addPet: async () => {},
  getAllPets: async () => [],
});

export const PetsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setPets([]);
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'pets'), where('userId', '==', user.uid));
    const unsub = onSnapshot(q, snap => {
      const list = snap.docs.map(d => {
        const data = d.data() as any;
        return {
          id: d.id,
          name: data.name,
          animalType: data.animalType,
          breed: data.breed,
          gender: data.gender,
          age: data.age,
          ageUnit: data.ageUnit,
          weight: data.weight,
          conditions: data.conditions,
          photoUrl: data.photoUrl || null,
          userId: data.userId, // ← importante para filtros
        } as Pet;
      });
      setPets(list);
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  const addPet = async (
    petData: Omit<Pet, 'id' | 'photoUrl'> & { photoLocalUri?: string }
  ) => {
    if (!user) throw new Error('Usuario no autenticado');

    const docRef = await addDoc(collection(db, 'pets'), {
      userId: user.uid,
      name: petData.name,
      animalType: petData.animalType,
      breed: petData.breed,
      gender: petData.gender,
      age: petData.age,
      ageUnit: petData.ageUnit,
      weight: petData.weight,
      conditions: petData.conditions,
    });

    if (petData.photoLocalUri) {
      const resp = await fetch(petData.photoLocalUri);
      const blob = await resp.blob();
      const storage = getStorage(app);
      const storageRef = ref(storage, `pets/${docRef.id}/photo.jpg`);
      await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(storageRef);
      await setDoc(
        firestoreDoc(db, 'pets', docRef.id),
        { photoUrl: url },
        { merge: true }
      );
    }
  };

  const getAllPets = async (): Promise<Pet[]> => {
    const snap = await getDocs(collection(db, 'pets'));
    return snap.docs.map(d => {
      const data = d.data() as any;
      return {
        id: d.id,
        name: data.name,
        animalType: data.animalType,
        breed: data.breed,
        gender: data.gender,
        age: data.age,
        ageUnit: data.ageUnit,
        weight: data.weight,
        conditions: data.conditions,
        photoUrl: data.photoUrl || null,
        userId: data.userId, // ← añadido aquí también
      } as Pet;
    });
  };

  return (
    <PetsContext.Provider value={{ pets, loading, addPet, getAllPets }}>
      {children}
    </PetsContext.Provider>
  );
};
