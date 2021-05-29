const { Purchase } = require('./models')

module.exports.createPurchase = (name, price, total, amount, productId, createdBy ) => new Promise(async (resolve, reject) => {
  const newPurchase = new Purchase({
    name,
    price,
    total,
    amount,
    productId,
    createdBy
  })

  try {
    const purchase = newPurchase.save()

    resolve(purchase)
  } catch (e) {
    resolve(e)
  }
})
