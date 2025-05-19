// context/ProfileContext.tsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../utils/FirebaseConfig';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
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

  const fetchProfile = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);

    // Traer datos de usuario
    const userSnap = await getDoc(doc(db, 'users', user.uid));
    if (userSnap.exists()) {
      const data = userSnap.data();
      setName(data.name);
      setEmail(data.email);
      setPhotoUrl(data.photoUrl || null); 
    }

    // Traer mascotas
    const petSnap = await getDocs(collection(db, 'users', user.uid, 'pets'));
    setPets(petSnap.docs.map(d => d.data().name as string));

    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return (
    <ProfileContext.Provider value={{ name, email, pets, photoUrl, loading, refreshProfile: fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};