import { supabase } from './supabaseClient'

const apiBaseUrl = (import.meta.env.API_BASE_URL || 'http://localhost:3000/api').replace(/\/+$/, '')

const toClientSnippet = (snippet) => ({
  ...snippet,
  createdAt: snippet.created_at,
  updatedAt: snippet.updated_at,
})

const request = async (path, options = {}) => {
  if (!supabase) {
    throw new Error('Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY in Client/.env.local.')
  }

  const { data: { session }, error: sessionError } = await supabase.auth.getSession()
  if (sessionError) throw sessionError
  if (!session?.access_token) throw new Error('Please sign in to access your snippets.')

  let response
  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    })
  } catch {
    throw new Error('Could not reach the DevVault API. Check API_BASE_URL and that the server is running.')
  }

  if (response.status === 204) return null

  let body
  try {
    body = await response.json()
  } catch {
    if (!response.ok) {
      throw new Error(`The API request failed with status ${response.status}.`)
    }
    throw new Error('The DevVault API returned an invalid response. Check API_BASE_URL points to your deployed backend.')
  }

  if (!response.ok) {
    throw new Error(body?.error?.message || `The API request failed with status ${response.status}.`)
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    throw new Error('The DevVault API returned an unexpected response. Check API_BASE_URL points to your deployed backend.')
  }

  return body
}

export const listSnippets = async () => {
  const snippets = []
  let offset = 0
  let page

  do {
    page = await request(`/snippets?limit=100&offset=${offset}`)
    if (!Array.isArray(page.data) || !Number.isInteger(page.pagination?.limit)) {
      throw new Error('The DevVault API returned an unexpected snippets response. Check that API_BASE_URL points to the current backend.')
    }
    snippets.push(...page.data.map(toClientSnippet))
    offset += page.pagination.limit
  } while (page.data.length === page.pagination.limit)

  return snippets
}

export const createSnippet = async (snippet) => {
  const response = await request('/snippets', {
    method: 'POST',
    body: JSON.stringify(snippet),
  })
  return toClientSnippet(response.data)
}

export const updateSnippet = async (id, updates) => {
  const response = await request(`/snippets/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  })
  return toClientSnippet(response.data)
}

export const deleteSnippet = (id) => request(`/snippets/${encodeURIComponent(id)}`, { method: 'DELETE' })

export const deleteAccount = () => request('/account', {
  method: 'DELETE',
  body: JSON.stringify({ confirmation: 'DELETE' }),
})
