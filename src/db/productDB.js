const { product } = require('../services')
const { Product } = require('./models')

module.exports.createProduct = (name, imageName, imageUrl, sellPrice, buyPrice, availableStock) => new Promise(async (resolve, reject) => {
  const newProduct =  new Product({  
    name,
    imageName,
    imageUrl,
    sellPrice,
    buyPrice,
    availableStock,
    totalSold: 0
  })

  try {
    const product = await newProduct.save()

    resolve(product)
  } catch (e) {
    resolve(e)
  }
})

module.exports.retrieveProducts = (query) => new Promise(async (resolve, reject) => {
  const products = await Product.find(query)

  resolve(products)
})

module.exports.deleteProduct = (id) => new Promise(async (resolve, reject) => {
  const product = await Product.findOneAndDelete({_id: id})

  resolve(product)
})
