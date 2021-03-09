const { Product } = require('./models')

module.exports.createProduct = (name, image, sellPrice, buyPrice, availableStock) => new Promise(async (resolve, reject) => {
  
  const newProduct =  new Product({  
    name,
    image,
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
