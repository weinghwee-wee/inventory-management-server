const { Token } = require('./models')
const jwt = require('jsonwebtoken')

module.exports.createToken = (userId) => new Promise(async (resolve, reject) => {
  const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET)

  const newToken = new Token({
    token,
  })

  try {
    const token = await newToken.save()

    resolve(token)
  } catch (e) {
    resolve(e)
  }
})


module.exports.deleteToken = (token) => new Promise(async (resolve, reject) => {
  await Token.deleteOne({ token })

  resolve('ok')
})
