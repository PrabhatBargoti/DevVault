import { useSyncExternalStore } from 'react'

let snippets = []
let hasCreatedSnippet = false
let snippetError = ''
const subscribers = new Set()

const notifySubscribers = () => {
  subscribers.forEach((subscriber) => subscriber())
}

const subscribe = (subscriber) => {
  subscribers.add(subscriber)
  return () => subscribers.delete(subscriber)
}

export const useSnippets = () => useSyncExternalStore(subscribe, () => snippets, () => snippets)
export const useSnippetError = () => useSyncExternalStore(subscribe, () => snippetError, () => snippetError)
export const getSnippets = () => snippets

export const setSnippetError = (error) => {
  snippetError = error
  notifySubscribers()
}

export const setSnippets = (nextSnippets) => {
  const updatedSnippets = typeof nextSnippets === 'function' ? nextSnippets(snippets) : nextSnippets
  if (updatedSnippets === snippets) return

  snippets = updatedSnippets
  snippetError = ''
  if (snippets.length > 0) hasCreatedSnippet = true
  notifySubscribers()
}

export const getHasCreatedSnippet = () => hasCreatedSnippet

export const clearSnippets = () => {
  snippets = []
  hasCreatedSnippet = false
  snippetError = ''
  notifySubscribers()
}

try {
  window.localStorage.removeItem('devvault-snippets')
  window.localStorage.removeItem('devvault-has-created-snippet')
} catch (error) {
  console.warn('Could not remove legacy browser-stored snippets:', error)
}
