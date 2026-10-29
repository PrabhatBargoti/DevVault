const express = require('express')
const { rateLimit } = require('express-rate-limit')
const { authenticate } = require('../middleware/authenticate')
const accountController = require('../controllers/account')

const router = express.Router()

const deleteRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 3,
  keyGenerator: (req) => `user:${req.user.id}`,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      error: {
        code: 'ACCOUNT_DELETE_RATE_LIMITED',
        message: 'Too many account deletion attempts. Please try again later.',
      },
    })
  },
})

router.use(authenticate)
router.delete('/', deleteRateLimit, accountController.deleteAccount)

module.exports = router
