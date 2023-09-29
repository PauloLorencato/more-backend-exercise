const app = require('express')(),
  token = require('./checkToken'),
  database = require('./database')

app.post('/', token, (req, res) => {
    // conferir se tem token
    res.status(200).sendFile(path.resolve('./src/owned.html'))
})

app.use('/data', database)

module.exports = app