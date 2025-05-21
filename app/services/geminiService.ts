// app/services/geminiService.ts
import Constants from 'expo-constants';
import { APIResponse } from '../../interfaces/Responses';

const { GEMINI_API_KEY } = (Constants.expoConfig?.extra ?? {}) as { GEMINI_API_KEY: string };

const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

export async function generateFromGemini(prompt: string): Promise<string> {
  const url = `${BASE_URL}/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  const body = { contents: [{ parts: [{ text: prompt }] }] };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    console.warn('Gemini API error:', res.status, await res.text());
    throw new Error(`Gemini error ${res.status}`);
  }
  const data: APIResponse = await res.json();
  return data.candidates?.[0]?.content.parts[0].text?.trim() 
         ?? 'Lo siento, no pude generar una respuesta.';
}
