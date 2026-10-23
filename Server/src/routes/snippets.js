const express = require('express')
const { rateLimit } = require('express-rate-limit')
const { authenticate } = require('../middleware/authenticate')
const snippetService = require('../services/snippets')
const {
  parsePagination,
  validateCreateSnippet,
  validateSnippetId,
  validateSnippetUpdate,
} = require('../utils/snippetValidation')

const router = express.Router()

const writeRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      error: {
        code: 'WRITE_RATE_LIMITED',
        message: 'Too many changes. Please try again later.',
      },
    })
  },
})

const userWriteRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  keyGenerator: (req) => `user:${req.user.id}`,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      error: {
        code: 'USER_WRITE_RATE_LIMITED',
        message: 'This account has made too many changes. Please try again later.',
      },
    })
  },
})

router.use(authenticate)

router.get('/', async (req, res) => {
  const pagination = parsePagination(req.query)
  const snippets = await snippetService.list(req.supabase, req.user.id, pagination)
  res.status(200).json({ data: snippets, pagination })
})

router.post('/', writeRateLimit, userWriteRateLimit, async (req, res) => {
  const input = validateCreateSnippet(req.body)
  const snippet = await snippetService.create(req.supabase, req.user.id, input)
  res.status(201).json({ data: snippet })
})

router.get('/:id', async (req, res) => {
  const id = validateSnippetId(req.params.id)
  const snippet = await snippetService.get(req.supabase, req.user.id, id)
  res.status(200).json({ data: snippet })
})

router.patch('/:id', writeRateLimit, userWriteRateLimit, async (req, res) => {
  const id = validateSnippetId(req.params.id)
  const updates = validateSnippetUpdate(req.body)
  const snippet = await snippetService.update(req.supabase, req.user.id, id, updates)
  res.status(200).json({ data: snippet })
})

router.delete('/:id', writeRateLimit, userWriteRateLimit, async (req, res) => {
  const id = validateSnippetId(req.params.id)
  await snippetService.remove(req.supabase, req.user.id, id)
  res.status(204).end()
})

module.exports = router
