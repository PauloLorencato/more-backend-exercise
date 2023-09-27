jwt = require('jsonwebtoken')
async function checkToken(req, res, next) {
    const authHeader = await req.headers['authorization'],
    token = authHeader && authHeader.split(' ')[1],
    SKEY = process.env.SKEY
    if (!token) {
      return res.status(400).json({msg: "Sem token!"})
    }
    try {
      const auth = await jwt.verify(token, SKEY)
    } catch (error) {
      console.log(error)
      return res.status(400).json({msg: "Acesso negado!"})
    }
    next()
}
module.exports = checkToken