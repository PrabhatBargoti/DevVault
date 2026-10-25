const express = require('express')
const { rateLimit } = require('express-rate-limit')
const { authenticate } = require('../middleware/authenticate')
const snippetController = require('../controllers/snippets')

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

router.get('/', snippetController.listSnippets)
router.post('/', writeRateLimit, userWriteRateLimit, snippetController.createSnippet)
router.get('/:id', snippetController.getSnippet)
router.patch('/:id', writeRateLimit, userWriteRateLimit, snippetController.updateSnippet)
router.delete('/:id', writeRateLimit, userWriteRateLimit, snippetController.deleteSnippet)

module.exports = router
