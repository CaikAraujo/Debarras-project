import { useLocaleContext } from './localeProvider'

const useI18n = () => {
  const { t, locale, setLocale } = useLocaleContext()
  return { t, locale, setLocale }
}

export default useI18n


