const { productDB } = require('../db')

module.exports.addProduct =  (req, res) => new Promise(async (resolve, reject) => {
  const {
    name,
    imageName,
    imageUrl,
    sellPrice,
    buyPrice,
    availableStock,
  } = req.body

  const response = await productDB.createProduct(
    name,
    imageName,
    imageUrl,
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
    query.name = {
      '$regex': name, '$options' : 'i'
    }
  }

  const response = await productDB.retrieveProducts(query)

  resolve(response)
})

module.exports.removeProduct = (req, res) => new Promise(async (resolve, reject) => {
  const { id } = req.params
  
  const response = await productDB.deleteProduct(id)

  resolve(response)
})

module.exports.editProduct = (req, res) => new Promise(async (resolve, reject) => {
  const { id } = req.params
  
  const response = await productDB.updateProduct(id, req.body)

  if (response._id) {
    return resolve(response)
  }

  reject(response)
})
