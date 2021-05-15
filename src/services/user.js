const { userDB } = require('../db')

module.exports.registerUser = (req, res) => new Promise(async (resolve, reject) => {
  const {
    name,
    email,
    password
  } = req.body

  const response = await userDB.createUser(name, email, password)

  if (response._id) return resolve(response)

  reject(response)
})
