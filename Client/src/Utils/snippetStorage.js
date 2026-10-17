const SNIPPETS_STORAGE_KEY = 'devvault-snippets'
const HAS_CREATED_SNIPPET_KEY = 'devvault-has-created-snippet'

export const getSavedSnippets = () => {
  try {
    const savedSnippets = JSON.parse(window.localStorage.getItem(SNIPPETS_STORAGE_KEY) || '[]')
    return Array.isArray(savedSnippets) ? savedSnippets : []
  } catch {
    return []
  }
}

export const saveSnippets = (snippets) => {
  try {
    window.localStorage.setItem(SNIPPETS_STORAGE_KEY, JSON.stringify(snippets))
    if (snippets.length > 0) {
      window.localStorage.setItem(HAS_CREATED_SNIPPET_KEY, 'true')
    }
  } catch {
    return
  }
}

export const getHasCreatedSnippet = () => {
  try {
    return window.localStorage.getItem(HAS_CREATED_SNIPPET_KEY) === 'true'
  } catch {
    return false
  }
}

export const markSnippetCreated = () => {
  try {
    window.localStorage.setItem(HAS_CREATED_SNIPPET_KEY, 'true')
  } catch {
    return
  }
}