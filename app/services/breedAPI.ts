import { dogBreedTranslations } from '../../utils/breedTranslation';
import { catBreedTranslations } from '../../utils/breedTranslation';


export async function getDogBreeds(): Promise<string[]> {
  const res = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await res.json();
  if (!data.message) return [];

  const breeds = Object.keys(data.message);
  return breeds.map(b => dogBreedTranslations[b.toLowerCase()] || capitalize(b));
}

function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}


export async function getCatBreeds(): Promise<string[]> {
  const res = await fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
      'x-api-key': 'TU_API_KEY'
    }
  });
  const data = await res.json();

  return data.map((b: any) => catBreedTranslations[b.name] || b.name);
}
