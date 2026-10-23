import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

let supabaseClient

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey)

export function getSupabaseClient() {
  if (!isSupabaseConfigured) {
    throw new Error('Authentication is not configured. Set the client Supabase environment variables and restart the app.')
  }

  if (!supabaseClient) {
    supabaseClient = createClient(supabaseUrl, supabasePublishableKey)
  }

  return supabaseClient
}
