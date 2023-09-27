const express = require('express'),
  auth = require('./routes/security'),
  dbase = require('./routes/database'),
  routes = require('./routes/pages'),
  mongoose = require('mongoose')
  app = express()

function startServer(port) {
  app.use(express.json())
  app.use('/', routes)

  mongoose
  .connect('mongodb://localhost:27017/?readPreference=primary&ssl=false&directConnection=true')
  .then(console.log("Conectado ao banco"))
  .catch((err) => console.log(err))

  app.listen(port, () => console.log(`Ouvindo porta ${port}`))
}

module.exports = startServer