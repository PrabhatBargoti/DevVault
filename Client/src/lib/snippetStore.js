import { useSyncExternalStore } from 'react'

let snippets = []
let hasCreatedSnippet = false
const subscribers = new Set()

const notifySubscribers = () => {
  subscribers.forEach((subscriber) => subscriber())
}

const subscribe = (subscriber) => {
  subscribers.add(subscriber)
  return () => subscribers.delete(subscriber)
}

export const useSnippets = () => useSyncExternalStore(subscribe, () => snippets, () => snippets)

export const setSnippets = (nextSnippets) => {
  const updatedSnippets = typeof nextSnippets === 'function' ? nextSnippets(snippets) : nextSnippets
  if (updatedSnippets === snippets) return

  snippets = updatedSnippets
  if (snippets.length > 0) hasCreatedSnippet = true
  notifySubscribers()
}

export const getHasCreatedSnippet = () => hasCreatedSnippet

export const clearSnippets = () => {
  snippets = []
  hasCreatedSnippet = false
  notifySubscribers()
}

try {
  window.localStorage.removeItem('devvault-snippets')
  window.localStorage.removeItem('devvault-has-created-snippet')
} catch (error) {
  console.warn('Could not remove legacy browser-stored snippets:', error)
}
