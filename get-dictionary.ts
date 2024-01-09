import 'server-only'
import { Locale } from './i18n.config'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  kr: () => import('./dictionaries/kr.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  //nl: () => import('./dictionaries/nl.json').then((module) => module.default),
  //cs: () => import('./dictionaries/cs.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) =>
//@ts-ignore
  dictionaries[locale]?.() ?? dictionaries.kr()