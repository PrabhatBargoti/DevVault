function getCorsOrigins(rawOrigins = process.env.CORS_ORIGINS) {
  const origins = (rawOrigins || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  if (origins.length === 0) {
    throw new Error('CORS_ORIGINS must include at least one HTTP(S) origin.')
  }

  for (const origin of origins) {
    try {
      const parsedOrigin = new URL(origin)
      if (!['http:', 'https:'].includes(parsedOrigin.protocol) || parsedOrigin.origin !== origin) {
        throw new Error()
      }
    } catch {
      throw new Error('CORS_ORIGINS must be a comma-separated list of HTTP(S) origins without paths.')
    }
  }

  return origins
}

function getConfig() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  const rawPort = process.env.PORT || '3000'
  const port = Number(rawPort)
  const corsOrigins = getCorsOrigins()

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

  return { corsOrigins, port, supabasePublishableKey, supabaseSecretKey, supabaseUrl }
}

module.exports = { getConfig, getCorsOrigins }
