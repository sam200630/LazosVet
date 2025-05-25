// context/MediaContext.tsx

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { db, storage } from '../utils/FirebaseConfig';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  DocumentData,
  getDoc,
  doc as docRef,
} from 'firebase/firestore';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

export interface MediaPost {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string | null;
  imageUrl: string;
  description: string;
  createdAt: Date;
}

interface MediaContextType {
  posts: MediaPost[];
  loading: boolean;
  addPost: (
    userId: string,
    imageUri: string,
    description: string
  ) => Promise<void>;
}

export const MediaContext = createContext<MediaContextType>({
  posts: [],
  loading: true,
  addPost: async () => {},
});

export const MediaProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<MediaPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const q = query(
      collection(db, 'media'),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, async snapshot => {
      // Por cada doc de media, traemos también su user
      const arr: MediaPost[] = await Promise.all(
        snapshot.docs.map(async docSnap => {
          const data = docSnap.data() as DocumentData;
          // fetch user
          const userSnap = await getDoc(docRef(db, 'users', data.userId));
          const userData = userSnap.exists() ? userSnap.data() : {};
          return {
            id: docSnap.id,
            userId: data.userId,
            userName: (userData.name as string) || 'unknown',
            userPhoto: (userData.photoUrl as string) || null,
            imageUrl: data.imageUrl,
            description: data.description,
            createdAt: data.createdAt.toDate(),
          };
        })
      );
      setPosts(arr);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const addPost = async (
    userId: string,
    imageUri: string,
    description: string
  ) => {
    setLoading(true);
    // 1️⃣ subir imagen
    const filename = `${userId}/${Date.now()}.jpg`;
    const imgRef = storageRef(storage, `media/${filename}`);
    const resp = await fetch(imageUri);
    const blob = await resp.blob();
    await uploadBytes(imgRef, blob);
    // 2️⃣ obtener URL
    const url = await getDownloadURL(imgRef);
    // 3️⃣ guardar en Firestore
    await addDoc(collection(db, 'media'), {
      userId,
      imageUrl: url,
      description,
      createdAt: serverTimestamp(),
    });
    setLoading(false);
  };

  return (
    <MediaContext.Provider value={{ posts, loading, addPost }}>
      {children}
    </MediaContext.Provider>
  );
};
