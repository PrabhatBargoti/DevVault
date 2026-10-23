function getConfig() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  const rawPort = process.env.PORT || '3000'
  const port = Number(rawPort)

  if (!supabaseUrl || !supabasePublishableKey || !supabaseSecretKey) {
    throw new Error(
      'SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, and SUPABASE_SECRET_KEY must be configured.',
    )
  }

  try {
    const parsedUrl = new URL(supabaseUrl)
    if (parsedUrl.protocol !== 'https:' && parsedUrl.hostname !== 'localhost' && parsedUrl.hostname !== '127.0.0.1') {
      throw new Error()
    }
  } catch {
    throw new Error('SUPABASE_URL must be a valid HTTPS URL (HTTP is allowed for localhost).')
  }

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.')
  }

  return { port, supabasePublishableKey, supabaseSecretKey, supabaseUrl }
}

module.exports = { getConfig }
