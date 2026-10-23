const { createAuthSupabaseClient, createDatabaseSupabaseClient } = require('../lib/supabaseClient')
const { HttpError } = require('../utils/httpError')

async function authenticate(req, _res, next) {
  const authorization = req.get('authorization') || ''
  const match = /^Bearer ([^\s]+)$/i.exec(authorization)

  if (!match) {
    return next(new HttpError(401, 'UNAUTHORIZED', 'A valid bearer token is required.'))
  }

  try {
    const authClient = createAuthSupabaseClient()
    const { data, error } = await authClient.auth.getUser(match[1])

    if (error) {
      if (error.status === 401 || error.status === 403) {
        return next(new HttpError(401, 'UNAUTHORIZED', 'The bearer token is invalid or expired.'))
      }
      return next(error)
    }

    if (!data.user) {
      return next(new HttpError(401, 'UNAUTHORIZED', 'The bearer token is invalid or expired.'))
    }

    req.supabase = createDatabaseSupabaseClient()
    req.user = data.user
    return next()
  } catch (error) {
    return next(error)
  }
}

module.exports = { authenticate }
