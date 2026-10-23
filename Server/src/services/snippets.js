const { HttpError } = require('../utils/httpError')

const SNIPPET_FIELDS = 'id, title, description, code, language, category, tags, created_at, updated_at'

function throwIfDatabaseError(error) {
  if (!error) {
    return
  }

  const failure = new Error('Snippet database operation failed.')
  failure.statusCode = 500
  failure.code = 'DATABASE_ERROR'
  failure.cause = error
  throw failure
}

async function list(supabase, userId, { limit, offset }) {
  const { data, error } = await supabase
    .from('snippets')
    .select(SNIPPET_FIELDS)
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })
    .range(offset, offset + limit - 1)

  throwIfDatabaseError(error)
  return data
}

async function create(supabase, userId, snippet) {
  const { data, error } = await supabase
    .from('snippets')
    .insert({ ...snippet, user_id: userId })
    .select(SNIPPET_FIELDS)
    .single()

  throwIfDatabaseError(error)
  return data
}

async function get(supabase, userId, id) {
  const { data, error } = await supabase
    .from('snippets')
    .select(SNIPPET_FIELDS)
    .eq('id', id)
    .eq('user_id', userId)
    .maybeSingle()

  throwIfDatabaseError(error)
  if (!data) {
    throw new HttpError(404, 'SNIPPET_NOT_FOUND', 'The snippet was not found.')
  }
  return data
}

async function update(supabase, userId, id, updates) {
  const { data, error } = await supabase
    .from('snippets')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', userId)
    .select(SNIPPET_FIELDS)
    .maybeSingle()

  throwIfDatabaseError(error)
  if (!data) {
    throw new HttpError(404, 'SNIPPET_NOT_FOUND', 'The snippet was not found.')
  }
  return data
}

async function remove(supabase, userId, id) {
  const { data, error } = await supabase
    .from('snippets')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)
    .select('id')
    .maybeSingle()

  throwIfDatabaseError(error)
  if (!data) {
    throw new HttpError(404, 'SNIPPET_NOT_FOUND', 'The snippet was not found.')
  }
}

module.exports = { create, get, list, remove, update }
