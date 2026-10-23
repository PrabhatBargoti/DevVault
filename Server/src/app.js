const express = require('express')
const { rateLimit } = require('express-rate-limit')
const snippetsRouter = require('./routes/snippets')
const { errorHandler } = require('./middleware/errorHandler')
const { HttpError } = require('./utils/httpError')

const app = express()

app.disable('x-powered-by')

const apiRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (_req, res) => {
    res.status(429).json({
      error: {
        code: 'RATE_LIMITED',
        message: 'Too many requests. Please try again later.',
      },
    })
  },
})

app.use('/api', apiRateLimit)
app.use(express.json({ limit: '128kb', strict: true }))
app.use('/api/snippets', snippetsRouter)
app.use((_req, _res, next) => {
  next(new HttpError(404, 'NOT_FOUND', 'The requested endpoint was not found.'))
})
app.use(errorHandler)

module.exports = app