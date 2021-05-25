const { productDB } = require('../db')

module.exports.checkProductAvailability = async (products) => {
  let productIds = []

  products.forEach(product => {
    productIds.push(product._id)
  })

  const availableProducts = await productDB.retrieveProducts({ _id: { $in: productIds } })

   for (let i = 0; i < products.length; i++) {
    const { name, amount } = products[0]
    const { availableStock } = availableProducts.filter((p) => p._id == products[i]._id)[0]

    if (amount > availableStock) {
      return`You ordered ${amount} ${name} but there is only ${availableStock} left. Please change the amount!`
    }
   }

  return null
}
