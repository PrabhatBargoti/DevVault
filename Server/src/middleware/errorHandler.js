function errorHandler(error, _req, res, _next) {
  if (res.headersSent) {
    return
  }

  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: { code: 'INVALID_JSON', message: 'The request body must contain valid JSON.' },
    })
  }

  if (error.type === 'entity.too.large') {
    return res.status(413).json({
      error: { code: 'PAYLOAD_TOO_LARGE', message: 'The request body is too large.' },
    })
  }

  const status = Number.isInteger(error.statusCode) ? error.statusCode : 500

  if (status >= 500) {
    console.error('API request failed:', {
      code: error.code,
      message: error.message,
      cause: error.cause && {
        code: error.cause.code,
        message: error.cause.message,
      },
    })
  }

  return res.status(status).json({
    error: {
      code: error.code || 'INTERNAL_SERVER_ERROR',
      message: status >= 500 ? 'An unexpected server error occurred.' : error.message,
    },
  })
}

module.exports = { errorHandler }
