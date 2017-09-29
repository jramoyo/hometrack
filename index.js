const express = require('express')
const routes = require('./app/routes')

const app = express()
const port = process.env.PORT || 3000

app.use('/', routes)

app.listen(port, () => {
  console.log(`Express server running at http://0.0.0.0:${port}/`)
})

module.exports = app
