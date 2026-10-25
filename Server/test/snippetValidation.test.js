const test = require('node:test')
const assert = require('node:assert/strict')
const {
  parsePagination,
  validateCreateSnippet,
  validateSnippetId,
  validateSnippetUpdate,
} = require('../src/validators/snippets')

test('create validation trims text and applies optional defaults', () => {
  assert.deepEqual(
    validateCreateSnippet({ title: '  Query helper  ', language: ' SQL ' }),
    {
      title: 'Query helper',
      language: 'SQL',
      description: '',
      code: '',
      category: '',
      tags: [],
    },
  )
})

test('create validation rejects missing required fields and unknown fields', () => {
  assert.throws(() => validateCreateSnippet({ title: 'Only a title' }), { statusCode: 400 })
  assert.throws(
    () => validateCreateSnippet({ title: 'Title', language: 'SQL', user_id: 'other-user' }),
    { statusCode: 400 },
  )
})

test('create validation enforces field and tag limits', () => {
  assert.throws(
    () => validateCreateSnippet({ title: 'x'.repeat(151), language: 'SQL' }),
    { statusCode: 400 },
  )
  assert.throws(
    () => validateCreateSnippet({ title: 'Title', language: 'SQL', tags: Array(21).fill('tag') }),
    { statusCode: 400 },
  )
})

test('update validation accepts partial updates but rejects empty patches', () => {
  assert.deepEqual(validateSnippetUpdate({ code: '  const answer = 42  ' }), {
    code: '  const answer = 42  ',
  })
  assert.throws(() => validateSnippetUpdate({}), { statusCode: 400 })
})

test('snippet IDs must be UUIDs', () => {
  assert.equal(validateSnippetId('a0b1c2d3-e4f5-6789-abcd-0123456789ab'), 'a0b1c2d3-e4f5-6789-abcd-0123456789ab')
  assert.throws(() => validateSnippetId('not-a-uuid'), { statusCode: 400 })
})

test('pagination applies defaults and rejects unbounded or malformed values', () => {
  assert.deepEqual(parsePagination({}), { limit: 50, offset: 0 })
  assert.deepEqual(parsePagination({ limit: '25', offset: '75' }), { limit: 25, offset: 75 })
  assert.throws(() => parsePagination({ limit: '101' }), { statusCode: 400 })
  assert.throws(() => parsePagination({ offset: '-1' }), { statusCode: 400 })
})
