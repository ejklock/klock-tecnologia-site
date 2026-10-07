import type { Locale } from "./locales";
import { en } from "./dictionaries/en";
import { pt, type Dictionary } from "./dictionaries/pt";

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
