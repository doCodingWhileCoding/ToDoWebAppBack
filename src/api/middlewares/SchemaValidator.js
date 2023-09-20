import { ZodError } from 'zod'

const validateSchema = (schema) => (req, res, next) => {
  try {
    const request = {}
    if (Object.keys(req.body).length !== 0) {
      request.body = req.body
    }
    if (Object.keys(req.params).length !== 0) {
      request.params = req.params
    }
    if (Object.keys(req.query).length !== 0) {
      request.query = req.query
    }
    schema.parse(request)
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      const err = {
        statusCode: 400,
        schemaErrors: error.errors,
      }
      return next(err)
    }
    return next(error)
  }
}

export default validateSchema
