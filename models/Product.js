module.exports = Product = require('mongoose').model('Product', {
  productName: String,
  meta: String,
  count: Number,
  data: Object
})