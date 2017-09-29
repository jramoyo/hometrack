const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

const Service = require('./service')
const service = new Service()

router.use(bodyParser.json())

router.post('/', (req, res) => {
  res.send({
    response: service.process(req.body.payload)
  })
})

module.exports = router
