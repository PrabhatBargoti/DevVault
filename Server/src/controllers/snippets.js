const snippetService = require('../services/snippets')
const {
  parsePagination,
  validateCreateSnippet,
  validateSnippetId,
  validateSnippetUpdate,
} = require('../validators/snippets')

async function listSnippets(req, res) {
  const pagination = parsePagination(req.query)
  const snippets = await snippetService.list(req.supabase, req.user.id, pagination)
  res.status(200).json({ data: snippets, pagination })
}

async function createSnippet(req, res) {
  const input = validateCreateSnippet(req.body)
  const snippet = await snippetService.create(req.supabase, req.user.id, input)
  res.status(201).json({ data: snippet })
}

async function getSnippet(req, res) {
  const id = validateSnippetId(req.params.id)
  const snippet = await snippetService.get(req.supabase, req.user.id, id)
  res.status(200).json({ data: snippet })
}

async function updateSnippet(req, res) {
  const id = validateSnippetId(req.params.id)
  const updates = validateSnippetUpdate(req.body)
  const snippet = await snippetService.update(req.supabase, req.user.id, id, updates)
  res.status(200).json({ data: snippet })
}

async function deleteSnippet(req, res) {
  const id = validateSnippetId(req.params.id)
  await snippetService.remove(req.supabase, req.user.id, id)
  res.status(204).end()
}

module.exports = {
  createSnippet,
  deleteSnippet,
  getSnippet,
  listSnippets,
  updateSnippet,
}
