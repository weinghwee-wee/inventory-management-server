const { productDB } = require('../db')

module.exports.addProduct =  (req, res) => new Promise(async (resolve, reject) => {
  const {
    name,
    image,
    sellPrice,
    buyPrice,
    availableStock,
  } = req.body

  const response = await productDB.createProduct(
    name,
    image,
    sellPrice,
    buyPrice,
    availableStock,
  )

  if (response._id)  return resolve(response)

  reject(response)
})

module.exports.fetchProducts = (req, res) => new Promise(async (resolve, reject) => {
  const { name } = req.query

  let query = {}

  if (name) {
    query['$text'] = {
      '$search': name
    }
  }

  const response = await productDB.retrieveProducts(query)

  resolve(response)
})
