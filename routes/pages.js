const app = require('express')()
const path = require('node:path')

// landing page
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./src/index.html'))
})

// security scan
app.post('/', (req, res) => {
    // conferir se tem token
})

module.exports = app