const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

const errorcode = require('err-code')

const Service = require('./service')
const service = new Service()

router.use(bodyParser.json())

router.post('/', (req, res) => {
  validate(req.body.payload)

  res.send({
    response: service.process(req.body.payload)
  })
})

router.use((err, req, res, next) => {
  if (!err) next()

  if (err instanceof SyntaxError) { // thrown by body-parser
    res.status(400).json(error('Could not decode request: JSON parsing failed'))
  } else if (err.code === '400') {
    res.status(400).json(error(err.message))
  } else {
    next(err)
  }
})

const validate = (payload) => {
  if (!payload) {
    throw errorcode('Request payload is missing', '400')
  }

  const everyAddress = payload.reduce((result, value) => {
    return result && value.address
  }, true)

  if (!everyAddress) {
    throw errorcode('Request payload contains an item without an address', '400')
  }
}

const error = (message) => {
  return { error: message }
}

module.exports = router
