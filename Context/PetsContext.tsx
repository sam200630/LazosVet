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
  breed: string;
  gender: string;
  age: number;
  ageUnit: 'Años' | 'Meses';
  weight: number;
  conditions: string;
  photoUrl: string | null;
}

export interface PetsContextType {
  pets: Pet[];
  loading: boolean;
  addPet: (
    petData: Omit<Pet, 'id' | 'photoUrl'> & { photoLocalUri?: string }
  ) => Promise<void>;
}

export const PetsContext = createContext<PetsContextType>({
  pets: [],
  loading: true,
  addPet: async () => {},
});

export const PetsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useContext(AuthContext);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setPets([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'pets'),
      where('userId', '==', user.uid)
    );
    const unsub = onSnapshot(q, snap => {
      const list = snap.docs.map(d => {
        const data = d.data() as any;
        return {
          id: d.id,
          name: data.name,
          breed: data.breed,
          gender: data.gender,
          age: data.age,
          ageUnit: data.ageUnit,
          weight: data.weight,
          conditions: data.conditions,
          photoUrl: data.photoUrl || null,
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

    // 1) crea el doc sin foto
    const docRef = await addDoc(collection(db, 'pets'), {
      userId: user.uid,
      name: petData.name,
      breed: petData.breed,
      gender: petData.gender,
      age: petData.age,
      ageUnit: petData.ageUnit,
      weight: petData.weight,
      conditions: petData.conditions,
    });

    // 2) sube la foto (si existe) y guarda URL
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
    // ¡onSnapshot se encargará de actualizar automáticamente!
  };

  return (
    <PetsContext.Provider value={{ pets, loading, addPet }}>
      {children}
    </PetsContext.Provider>
  );
};
