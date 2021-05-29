const { productDB, purchaseDB } = require('../db')

module.exports.addProduct =  (req, res) => new Promise(async (resolve, reject) => {
  const { _id } = req.user

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
    _id
  )

  if (response._id)  return resolve(response)

  reject(response)
})

module.exports.fetchProducts = (req, res) => new Promise(async (resolve, reject) => {
  const { name } = req.query

  let query = {
    createdBy: req.user._id
  }

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

module.exports.restockProduct = (req, res) => new Promise(async (resolve, reject) => {
  const { id, amount } = req.body
  const { _id: userId } = req.user

  const response = await productDB.restockProduct(id, amount)

  if (response._id) {
    const { name, _id, sellPrice } = response

    await purchaseDB.createPurchase(
      name,
      sellPrice,
      sellPrice * amount,
      amount,
      _id,
      userId
    )
    
    return resolve(response)
  }

  reject(response)
})
