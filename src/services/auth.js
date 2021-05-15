const { tokenDB } = require('../db')
const { User } = require('../db/models')

module.exports.loginUser = (req, res) => new Promise(async (resolve, reject) => {
  const { email, password } = req.body

  try {
    const user = await User.findByCredentials(email, password)
    const { token } = await tokenDB.createToken(user._id)

    resolve({
      user,
      token
    })
  } catch (e) {
    reject(e.message)
  }
})
