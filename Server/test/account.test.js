const test = require('node:test')
const assert = require('node:assert/strict')
const accountController = require('../src/controllers/account')
const accountService = require('../src/services/account')

test('account deletion requires the explicit DELETE confirmation', async () => {
  await assert.rejects(
    accountController.deleteAccount({
      body: { confirmation: 'delete' },
      user: { id: 'user-id' },
    }, {}),
    { statusCode: 400, code: 'CONFIRMATION_REQUIRED' },
  )
})

test('account deletion revokes sessions before permanently deleting the authenticated user', async () => {
  const calls = []
  const supabase = {
    auth: {
      admin: {
        signOut: async (token, scope) => {
          calls.push(['signOut', token, scope])
          return { error: null }
        },
        deleteUser: async (userId, shouldSoftDelete) => {
          calls.push(['deleteUser', userId, shouldSoftDelete])
          return { error: null }
        },
      },
    },
  }

  await accountService.remove(supabase, 'verified-user-id', 'verified-access-token')

  assert.deepEqual(calls, [
    ['signOut', 'verified-access-token', 'global'],
    ['deleteUser', 'verified-user-id', false],
  ])
})

test('account deletion stops if session revocation fails', async () => {
  let deletionAttempted = false
  const supabase = {
    auth: {
      admin: {
        signOut: async () => ({ error: new Error('revocation failed') }),
        deleteUser: async () => {
          deletionAttempted = true
          return { error: null }
        },
      },
    },
  }

  await assert.rejects(
    accountService.remove(supabase, 'verified-user-id', 'verified-access-token'),
    { statusCode: 500, code: 'ACCOUNT_OPERATION_FAILED' },
  )
  assert.equal(deletionAttempted, false)
})
