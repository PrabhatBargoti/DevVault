const test = require('node:test')
const assert = require('node:assert/strict')
const { getCorsOrigins } = require('../src/config/env')
const app = require('../src/app')

test('CORS origins default to the local Vite development origin', () => {
  assert.deepEqual(getCorsOrigins(''), ['http://localhost:5173'])
})

test('CORS origins accept comma-separated HTTP(S) origins', () => {
  assert.deepEqual(
    getCorsOrigins('http://localhost:5173, https://devvault.example'),
    ['http://localhost:5173', 'https://devvault.example'],
  )
})

test('CORS origins reject paths, invalid URLs, and empty allowlists', () => {
  assert.throws(() => getCorsOrigins('https://devvault.example/app'), /without paths/)
  assert.throws(() => getCorsOrigins('not a url'), /without paths/)
  assert.throws(() => getCorsOrigins(' , '), /at least one/)
})

test('API responds to an allowed browser preflight request', async (context) => {
  const server = app.listen(0)
  context.after(() => new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve())
  }))
  await new Promise((resolve) => server.once('listening', resolve))

  const response = await fetch(`http://127.0.0.1:${server.address().port}/api/snippets`, {
    method: 'OPTIONS',
    headers: {
      Origin: 'http://localhost:5173',
      'Access-Control-Request-Method': 'GET',
      'Access-Control-Request-Headers': 'authorization',
    },
  })

  assert.equal(response.status, 204)
  assert.equal(response.headers.get('access-control-allow-origin'), 'http://localhost:5173')
  assert.match(response.headers.get('access-control-allow-headers'), /authorization/i)
})
