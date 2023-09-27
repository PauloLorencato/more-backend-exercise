module.exports = User = require('mongoose').model('User', {
    name: String,
    email: String,
    password: String
})