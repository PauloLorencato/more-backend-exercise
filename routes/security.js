const app = require('express')(),
  path = require('node:path'),
  User = require('../models/User'),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken')

//signup
app.post('/signup', async (req, res) => {
  const {name, email, password, confirmPassword} = req.body
  
  // testes de dados
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({msg: "Preencha todos os dados corretamente!"})
  }
  if (password !== confirmPassword) {
    return res.status(400).json({msg: "Senhas não conferem!"})
  }
  if (await User.findOne({name: name})) {
    return res.status(400).json({msg: "Nome já cadastrado!"})
  }
  if (await User.findOne({email: email})) {
    return res.status(400).json({msg: "Este email já está em uso!"})
  }
  const salt = await bcrypt.genSalt(12),
  passwordHash = await bcrypt.hash(password, salt)

  const user = await new User({
    name, email, password: passwordHash
  })

  try {
    await user.save()
    res.status(201).json({msg: "Usuário criado com sucesso!"})
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: "Erro interno, tente novamente!"})
  }
})

//signin
app.post('/signin', async (req, res) => {
  const {name, password} = req.body

  if (!name || !password) {
    return res.status(400).json({msg: "Preencha todos os dados corretamente!"})
  }

  try {
    const user = await User.findOne({name: name})
    if (!user) {
      return res.status(400).json({msg: "Usuário não encontrado!"})
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(400).json({msg: "Senha incorreta!"})
    }
    const SKEY = process.env.SKEY
    const token = await jwt.sign({id: user._id, name: user.name}, SKEY)
    res.status(200).json({msg: `Olá ${user.name}, seja bem vindo!`, token})
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: "Erro interno, tente novamente!"})
  }
})

module.exports = app