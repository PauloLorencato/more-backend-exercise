const app = require('express')(),
  token = require('./checkToken'),
  Product = require('../models/Product')

  // novo produto
app.post('/create', token, async (req, res) => {
  const {productName, owner, count, data} = await req.body,
  date = new Date().toISOString(),
  meta = `owner:${owner},created:${date},lastModified:${date}`
  if (!data) {
    return res.status(400).json({msg: "Sem dados válidos!"})
  }

  const product = new Product({
    productName: productName,
    meta: meta,
    count: count,
    data: data
  })

  try {
    await product.save()
    return res.status(201).json({msg:"Novo produto cadastrado!"})
  } catch (error) {
    return res.status(500).json({msg:"Erro ao tentar cadastrar produto!"})
  }

})

// retrieve
app.get('/search/:productName', token, async (req, res) => {
  const productName = req.params.productName

  try {
    const product = await Product.findOne({productName: productName})
    return res.status(200).json({msg: "Produto encontrado!", product})
  } catch (error) {
    return res.status(404).json({msg: "Produto não encontrado!"})
  }
})
app.get('/search', token, async (req, res) => {
  try {
    const products = await Product.find()
    if (!products) {
      return res.status(400).json({msg: "Nenhum produto encontrado!"})
    }
    return res.status(200).json({products})
  } catch (error) {
    return res.status(500).json({msg: "Erro interno, tente mais tarde!"})
  }
})

// update
app.patch('/update', token, async (req, res) => {
  const {productName, owner, data} = req.body,
    register = await Product.findOne({productName: productName})
  if (!register) {
    res.status(400).json({msg: "Produto não encontrado!"})
  }
  let meta = await register.meta.split(','),
    realOwner = await meta[0].split(':')[1]
    meta[2] = `lastModified:${new Date().toISOString()}`
    meta = await meta.toString()
  if(realOwner !== owner) {
    return res.status(400).json({msg: "Apenas o proprietário do produto pode realizar modificações!"})
  }
  if(!data || register.data === data) {
    return res.status(400).json({msg: "Sem alteração de dados!"})
  }
  try {
    await Product.updateOne({productName: productName, meta: meta, data: data})
    return res.status(201).json({msg: "Alterado com sucesso!"})
  } catch (error) {
    return res.status(500).json({msg: "Erro interno, tente novamente!"})
  }
  
})

// delete
app.delete('/delete', token, async (req, res) => {
  const productName = req.body.productName
  try {
    const deleted = await Product.deleteOne({productName: productName})
    console.log(deleted)
    if (deleted.deletedCount === 0) {
      return res.status(200).json({msg: `Não foi possível remover ${productName}!`})
    }
    return res.status(200).json({msg: "Removido com sucesso!"})
  } catch (error) {
    return res.status(500).json({msg: "Erro interno, tente mais tarde!"})
  }
})

module.exports = app