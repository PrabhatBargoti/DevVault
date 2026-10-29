function throwIfAccountError(operation, error) {
  if (!error) {
    return
  }

  const failure = new Error(`Account ${operation} failed.`)
  failure.statusCode = 500
  failure.code = 'ACCOUNT_OPERATION_FAILED'
  failure.cause = error
  throw failure
}

async function remove(supabase, userId, accessToken) {
  const { error: revokeError } = await supabase.auth.admin.signOut(accessToken, 'global')
  throwIfAccountError('session revocation', revokeError)

  const { error: deleteError } = await supabase.auth.admin.deleteUser(userId, false)
  throwIfAccountError('deletion', deleteError)
}

module.exports = { remove }
