const app = require('express')()
const path = require('node:path')
const auth = require('./security')
const token = require('./checkToken')

app.use('/auth', auth)
// landing page
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./src/index.html'))
})

// security scan
app.post('/private', token, (req, res) => {
    // conferir se tem token
    res.status(200).json({msg: "Autenticado!"})
})

module.exports = app