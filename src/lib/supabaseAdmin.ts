import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  throw new Error('Env NEXT_PUBLIC_SUPABASE_URL ausente.')
}
if (!serviceKey) {
  throw new Error('Env SUPABASE_SERVICE_ROLE_KEY ausente. Defina a Service Role Key do projeto.')
}

export const supabaseAdmin = createClient(supabaseUrl, serviceKey)


