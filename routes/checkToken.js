jwt = require('jsonwebtoken')
path = require('node:path')
async function checkToken(req, res, next) {
    const authHeader = await req.headers['authorization'],
    token = authHeader && authHeader.split(' ')[1],
    SKEY = process.env.SKEY
    if (!token) {
      return res.status(400).json({msg: "Sem token!"})
    }
    try {
      await jwt.verify(token, SKEY)
      next()
    } catch (error) {
      return res.status(422).sendFile(path.resolve('./src/signin.html'))
    }
}
module.exports = checkToken