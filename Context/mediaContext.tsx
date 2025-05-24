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
} from 'firebase/firestore';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

export interface MediaPost {
  id: string;
  userId: string;
  imageUrl: string;
  description: string;
  createdAt: Date;
}

interface MediaContextType {
  posts: MediaPost[];
  loading: boolean;
  /**
   * Crea una nueva publicación:
   * - sube la imagen que recibe como URI local
   * - obtiene su URL pública
   * - añade un doc en Firestore en la colección "media"
   */
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

  // ⏳ Suscripción en tiempo real al feed de "media", ordenado por fecha descendente
  useEffect(() => {
    const q = query(
      collection(db, 'media'),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, snapshot => {
      const arr: MediaPost[] = snapshot.docs.map(doc => {
        const data = doc.data() as DocumentData;
        return {
          id: doc.id,
          userId: data.userId,
          imageUrl: data.imageUrl,
          description: data.description,
          createdAt: data.createdAt.toDate(),
        };
      });
      setPosts(arr);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // 📤 Función para crear una publicación
  const addPost = async (
    userId: string,
    imageUri: string,
    description: string
  ) => {
    setLoading(true);

    // 1️⃣ Subir la imagen a Storage
    // Ruta: media/<userId>/<timestamp>.jpg
    const filename = `${userId}/${Date.now()}.jpg`;
    const imageRef = storageRef(storage, `media/${filename}`);

    // fetch→blob para convertir URI local en blob
    const resp = await fetch(imageUri);
    const blob = await resp.blob();

    await uploadBytes(imageRef, blob);

    // 2️⃣ Obtener URL pública
    const url = await getDownloadURL(imageRef);

    // 3️⃣ Guardar documento en Firestore
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
