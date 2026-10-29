const test = require('node:test')
const assert = require('node:assert/strict')
const app = require('../src/app')

test('snippet and account APIs reject requests without a verified user token', async (context) => {
  const server = app.listen(0)
  context.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve())
  }))
  await new Promise((resolve) => server.once('listening', resolve))

  const baseUrl = `http://127.0.0.1:${server.address().port}`
  const snippetResponse = await fetch(`${baseUrl}/api/snippets`)
  const deleteAccountResponse = await fetch(`${baseUrl}/api/account`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ confirmation: 'DELETE' }),
  })

  assert.equal(snippetResponse.status, 401)
  assert.equal(deleteAccountResponse.status, 401)
})
