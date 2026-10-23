const { createClient } = require('@supabase/supabase-js')
const { getConfig } = require('../config/env')

function createAuthSupabaseClient() {
  const { supabasePublishableKey, supabaseUrl } = getConfig()

  return createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  })
}

function createDatabaseSupabaseClient() {
  const { supabaseSecretKey, supabaseUrl } = getConfig()

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  })
}

module.exports = { createAuthSupabaseClient, createDatabaseSupabaseClient }