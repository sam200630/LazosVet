// ===============================================================
// Archivo: context/AuthContext.tsx
// Propósito: Proveer funciones y estado para la autenticación de usuarios,
// incluyendo el login, logout y la asignación de roles al usuario.
// ===============================================================

import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../utils/FirebaseConfig';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User as FirebaseUser,
} 
from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { Routes } from '../route';


export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userType, setUserType] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr: FirebaseUser | null) => {
      setUser(usr);

      if (usr?.email) {
        const isAdmin = usr.email.includes('@admin');
        const role = isAdmin ? 'admin' : 'usuario';
        setUserType(role);

        router.replace(isAdmin ? Routes.Admin : Routes.Home);
      } else {
        setUserType('');
        router.replace('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  };

  const register = async (
    name: string,
    phone: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid;

      const role = email.includes('@admin') ? 'admin' : 'usuario';

      await setDoc(doc(db, 'users', uid), {
        uid,
        name,
        phone,
        email,
        userType: role,
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
    setUserType('');
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userType,
        email: user?.email || '',
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
