const { HttpError } = require('../utils/httpError')

const FIELD_LIMITS = {
  title: 150,
  description: 1000,
  code: 100000,
  language: 50,
  category: 50,
}
const ALLOWED_FIELDS = new Set([...Object.keys(FIELD_LIMITS), 'tags'])
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function badRequest(message) {
  return new HttpError(400, 'INVALID_REQUEST', message)
}

function assertObject(body) {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    throw badRequest('The request body must be a JSON object.')
  }
}

function validateFields(body, isCreate) {
  assertObject(body)
  const keys = Object.keys(body)

  if (keys.some((key) => !ALLOWED_FIELDS.has(key))) {
    throw badRequest('The request contains unsupported fields.')
  }

  if (isCreate && (!Object.hasOwn(body, 'title') || !Object.hasOwn(body, 'language'))) {
    throw badRequest('Title and language are required.')
  }

  if (!isCreate && keys.length === 0) {
    throw badRequest('Provide at least one field to update.')
  }

  const result = {}
  for (const field of Object.keys(FIELD_LIMITS)) {
    if (!Object.hasOwn(body, field)) {
      continue
    }
    if (typeof body[field] !== 'string') {
      throw badRequest(`${field} must be a string.`)
    }

    const value = field === 'code' ? body[field] : body[field].trim()
    if (value.length > FIELD_LIMITS[field]) {
      throw badRequest(`${field} must be ${FIELD_LIMITS[field]} characters or fewer.`)
    }
    if ((field === 'title' || field === 'language') && value.length === 0) {
      throw badRequest(`${field} cannot be empty.`)
    }
    result[field] = value
  }

  if (Object.hasOwn(body, 'tags')) {
    if (!Array.isArray(body.tags) || body.tags.length > 20) {
      throw badRequest('tags must be an array containing no more than 20 items.')
    }

    result.tags = body.tags.map((tag) => {
      if (typeof tag !== 'string') {
        throw badRequest('Each tag must be a string.')
      }
      const normalizedTag = tag.trim()
      if (normalizedTag.length === 0 || normalizedTag.length > 40) {
        throw badRequest('Each tag must contain between 1 and 40 characters.')
      }
      return normalizedTag
    })
  }

  if (isCreate) {
    result.description = result.description || ''
    result.code = result.code || ''
    result.category = result.category || ''
    result.tags = result.tags || []
  }

  return result
}

function validateCreateSnippet(body) {
  return validateFields(body, true)
}

function validateSnippetUpdate(body) {
  return validateFields(body, false)
}

function validateSnippetId(id) {
  if (typeof id !== 'string' || !UUID_PATTERN.test(id)) {
    throw badRequest('The snippet id must be a valid UUID.')
  }
  return id
}

function parsePagination(query) {
  const limit = parsePaginationValue(query.limit, 50, 100, 'limit')
  const offset = parsePaginationValue(query.offset, 0, 100000, 'offset')
  return { limit, offset }
}

function parsePaginationValue(value, defaultValue, maxValue, field) {
  if (value === undefined) {
    return defaultValue
  }
  if (typeof value !== 'string' || !/^(0|[1-9]\d*)$/.test(value)) {
    throw badRequest(`${field} must be a non-negative integer.`)
  }

  const parsed = Number(value)
  if (!Number.isSafeInteger(parsed) || parsed > maxValue || (field === 'limit' && parsed === 0)) {
    throw badRequest(`${field} must be between ${field === 'limit' ? 1 : 0} and ${maxValue}.`)
  }
  return parsed
}

module.exports = {
  parsePagination,
  validateCreateSnippet,
  validateSnippetId,
  validateSnippetUpdate,
}
