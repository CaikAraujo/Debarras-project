'use client'

import useI18n from './useI18n'
import type { Locale } from '@/data/i18n'
import { useEffect, useState } from 'react'

const options = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'it', label: 'IT' },
] as const

const LanguagePicker = () => {
  const { locale, setLocale } = useI18n()
  const [isMobile, setIsMobile] = useState(false)

  // Checagem responsiva simples por largura de viewport
  useEffect(() => {
    const check = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth <= 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) {
    return (
      <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <span className="sr-only">Language</span>
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          aria-label="Language selector"
          style={{
            padding: '6px 8px',
            border: '1px solid var(--border-gray)',
            background: 'white',
            color: 'var(--text-dark)',
            fontSize: '12px',
          }}
        >
          {options.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>
    )
  }

  return (
    <div role="group" aria-label="Language selector" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {options.map((opt) => (
        <button
          key={opt.code}
          onClick={() => setLocale(opt.code as Locale)}
          aria-current={locale === opt.code}
          style={{
            padding: '6px 8px',
            border: '1px solid var(--border-gray)',
            background: locale === opt.code ? 'var(--text-dark)' : 'transparent',
            color: locale === opt.code ? 'white' : 'var(--text-dark)',
            fontSize: '12px',
            lineHeight: 1,
            cursor: 'pointer'
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

export default LanguagePicker


