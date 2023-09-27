const app = require('express')(),
  path = require('node:path'),
  User = require('../models/User')

//signup
app.post('/signup', async (req, res) => {
  const {name, email, password, confirmPassword} = req.body
  
  // testes de dados
  if (password !== confirmPassword) {
    return res.status(500).sendFile(path.resolve('./src/signup.html')).json({msg: "Senhas não conferem!"})
  }
  if (User.findOne({email: email})) {
    return res.status(500).sendFile(path.resolve('./src/signup.html')).json({msg: "Este email já está em uso!"})
  }

  const user = await new User({
    name, email, password
  })

  try {
    await user.save()
    res.status(201).sendFile(path.resolve('./src/signin.html')).json({msg: "Usuário criado com sucesso!"})
  } catch (error) {
    console.log(error)
    res.status(500).sendFile(path.resolve('./src/signup.html')).json({msg: "Erro interno, tente novamente!"})
  }
})

//signin
app.post('/signin', (req, res) => {

})

module.exports = app