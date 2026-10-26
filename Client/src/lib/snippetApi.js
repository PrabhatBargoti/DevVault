import { supabase } from './supabaseClient'

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api').replace(/\/+$/, '')

const toClientSnippet = (snippet) => ({
  ...snippet,
  createdAt: snippet.created_at,
  updatedAt: snippet.updated_at,
})

const request = async (path, options = {}) => {
  if (!supabase) {
    throw new Error('Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY in Client/.env.local.')
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
    throw new Error('Could not reach the DevVault API. Check VITE_API_BASE_URL and that the server is running.')
  }

  if (response.status === 204) return null

  const body = await response.json().catch(() => null)
  if (!response.ok) {
    throw new Error(body?.error?.message || `The API request failed with status ${response.status}.`)
  }
  return body
}

export const listSnippets = async () => {
  const snippets = []
  let offset = 0
  let page

  do {
    page = await request(`/snippets?limit=100&offset=${offset}`)
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
