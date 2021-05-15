const authMiddlware = require('../middlewares/authMiddleware')

const requestHandler = (method, authFlag) => {
  const methodHandler = async (req, res, next) => {
    if (req.error) {
      return next()
    }

    try {
      const result = await method(req, res)
      req.result = result

      next()
    } catch (e) {
      if (e.statusCode) {
        req.error = {
          statusCode: e.statusCode,
          response: e.errorResponse
        }
      } else {
        req.error = {
          response: e
        }
      }
      next()
    }
  }

  return [
    authMiddlware(authFlag),
    methodHandler,
    createResponse
  ]
}

const createResponse = (req, res, next) => {
  const { error, result } = req

  if (result) {
    return res.send({
      status: 200,
      result
    })
  }

  const { statusCode, response } = errorMapping(error)

  res.status(statusCode || 400).send({
    status: statusCode || 400,
    error: response
  })
}

const errorMapping = (error) => {
  if (error.response.code && error.response.code === 11000) {
    let key
    const { keyValue } = error.response 

    for (const property in keyValue) {
      key = property
    }
    error.response = `Duplicated ${key}!`
  }

  return error
}


module.exports = requestHandler
