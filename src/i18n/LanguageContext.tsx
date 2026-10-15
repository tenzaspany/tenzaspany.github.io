import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { LanguageContext } from './language-context'
import type { Language } from './types'
import en from './en'
import pl from './pl'

export type { Language, Dictionary } from './types'
import type { Dictionary } from './types'

const dictionaries: Record<Language, Dictionary> = { en, pl }

function getSavedLanguage(): Language {
  try {
    return localStorage.getItem('portfolio-language') === 'pl' ? 'pl' : 'en'
  } catch {
    return 'en'
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getSavedLanguage)

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage)
    try {
      localStorage.setItem('portfolio-language', nextLanguage)
    } catch {
      // The language still updates for this session when storage is unavailable.
    }
  }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const value = useMemo(
    () => ({ language, dictionary: dictionaries[language], setLanguage }),
    [language],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
