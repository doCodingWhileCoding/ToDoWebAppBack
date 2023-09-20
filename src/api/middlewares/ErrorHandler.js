const ErrorHandler = (err, req, res, next) => {
  console.error(err)

  const errStatus = err.statusCode || 500

  const error = {
    errMsg: err.errMsg ? err.errMsg : null,
    schemaErrors: err.schemaErrors ? err.schemaErrors : null,
    stack: (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test') && err.stack ? err.stack : null,
  }

  res.status(errStatus).json(error)
}

export default ErrorHandler
