// context/ProfileContext.tsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../utils/FirebaseConfig';
import {
  doc,
  getDoc,
  onSnapshot,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { AuthContext } from './AuthContext';

export interface ProfileContextType {
  name: string;
  email: string;
  pets: string[];
  photoUrl: string | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

export const ProfileContext = createContext<ProfileContextType>({
  name: '',
  email: '',
  pets: [],
  photoUrl: null,
  loading: true,
  refreshProfile: async () => {},
});

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pets, setPets] = useState<string[]>([]);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 1) Carga inicial de nombre, correo y foto
  const fetchProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);

    const userSnap = await getDoc(doc(db, 'users', user.uid));
    if (userSnap.exists()) {
      const data = userSnap.data();
      setName(data.name);
      setEmail(data.email);
      setPhotoUrl(data.photoUrl || null);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  // 2) Suscripción en tiempo real a la colección "pets" filrada por userId
  useEffect(() => {
    if (!user) {
      setPets([]);
      return;
    }
    const q = query(
      collection(db, 'pets'),
      where('userId', '==', user.uid)
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      const names = snapshot.docs.map(d => d.data().name as string);
      setPets(names);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <ProfileContext.Provider
      value={{
        name,
        email,
        pets,
        photoUrl,
        loading,
        refreshProfile: fetchProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
