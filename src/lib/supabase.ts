import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL
const supabasePubKey = import.meta.env.VITE_APP_SUPABASE_PUBKEY

export const supabase = createClient(supabaseUrl, supabasePubKey) 