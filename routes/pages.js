const app = require('express')()
const path = require('node:path')
const auth = require('./security')
const private = require('./private')

// landing page
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./src/index.html'))
})

// rotas de signup e signin
app.use('/auth', auth)

// rotas autenticadas
app.use('/private', private)


module.exports = app