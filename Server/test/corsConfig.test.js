const test = require('node:test')
const assert = require('node:assert/strict')
const { getCorsOrigins } = require('../src/config/env')

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
