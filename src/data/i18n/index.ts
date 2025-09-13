export type Locale = 'fr' | 'en' | 'it';

import fr from './fr';
import en from './en';
import it from './it';

export const dictionaries = { fr, en, it } as const;

export type Dictionary = typeof dictionaries['fr'];

const getDictionary = (locale: Locale): Dictionary => {
  return dictionaries[locale] ?? dictionaries.fr;
}

export default getDictionary;


