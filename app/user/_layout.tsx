// app/user/_layoutUser.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function UserLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
