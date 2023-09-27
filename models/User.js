module.exports = User = require('mongoose').model('User', {
    user: String,
    email: String,
    password: String
})