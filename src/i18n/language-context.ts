import { createContext } from 'react'
import type { Dictionary, Language } from './types'

export interface LanguageContextValue {
  language: Language
  dictionary: Dictionary
  setLanguage: (_language: Language) => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)
