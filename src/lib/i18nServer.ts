import { cookies } from 'next/headers'
import getDictionary, { type Dictionary, type Locale } from '@/data/i18n'

const getServerDictionary = async (): Promise<Dictionary> => {
  const cookieStore = await cookies()
  const locale = cookieStore.get('locale')?.value as Locale | undefined
  return getDictionary(locale ?? 'fr')
}

export default getServerDictionary


