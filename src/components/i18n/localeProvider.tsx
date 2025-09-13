'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import getDictionary, { type Dictionary, type Locale } from '@/data/i18n'

type LocaleContextValue = {
  locale: Locale
  t: Dictionary
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

const readLocaleCookie = (): Locale | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|; )locale=([^;]+)/)
  return match ? (decodeURIComponent(match[1]) as Locale) : null
}

const writeLocaleCookie = (locale: Locale) => {
  if (typeof document === 'undefined') return
  document.cookie = `locale=${encodeURIComponent(locale)}; path=/; max-age=${60 * 60 * 24 * 365}`
}

const LocaleProvider = ({ children, defaultLocale = 'fr' as Locale }: { children: React.ReactNode; defaultLocale?: Locale }) => {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const stored = readLocaleCookie()
    if (stored && stored !== locale) setLocaleState(stored)
  }, [])

  const t = useMemo(() => getDictionary(locale), [locale])

  const setLocale = (next: Locale) => {
    setLocaleState(next)
    writeLocaleCookie(next)
  }

  const value = useMemo(() => ({ locale, t, setLocale }), [locale, t])

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  )
}

export const useLocaleContext = () => {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocaleContext must be used within LocaleProvider')
  return ctx
}

export default LocaleProvider


