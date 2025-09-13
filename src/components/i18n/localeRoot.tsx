'use client'

import { useEffect } from 'react'
import LocaleProvider, { useLocaleContext } from './localeProvider'

const LangSync = () => {
  const { locale } = useLocaleContext()
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])
  return null
}

const LocaleRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <LocaleProvider>
      <LangSync />
      {children}
    </LocaleProvider>
  )
}

export default LocaleRoot


