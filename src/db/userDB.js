const { User } = require('./models')

module.exports.createUser = (name, email, password) => new Promise(async(resolve, reject) => {
  const newUser = new User({
    name,
    email,
    password
  })

  try {
    const user = await newUser.save()

    resolve(user)
  } catch (e) {
    resolve(e)
  }
})
