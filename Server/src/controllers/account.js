const accountService = require('../services/account')
const { HttpError } = require('../utils/httpError')

async function deleteAccount(req, res) {
  if (!req.body || req.body.confirmation !== 'DELETE') {
    throw new HttpError(400, 'CONFIRMATION_REQUIRED', 'Type DELETE to confirm account deletion.')
  }

  await accountService.remove(req.supabase, req.user.id, req.accessToken)
  res.status(204).end()
}

module.exports = { deleteAccount }
