const { Order } = require('./models')

module.exports.createOrder = (name, location, phoneNo, total, items, shippingFee) => new Promise(async (resolve, reject) => {
  const newOrder =  new Order({  
    name,
    location,
    phoneNo,
    date: new Date(),
    status: 'New',
    total,
    items,
    shippingFee
  })

  try {
    const order = await newOrder.save()

    resolve(order)
  } catch (e) {
    resolve(e)
  }
})

module.exports.retrieveOrders = (query) => new Promise(async (resolve, reject) => {
  const products = await Order.find(query)

  resolve(products)
})

module.exports.deleteOrder = (id) => new Promise(async (resolve, reject) => {
  const order = await Order.findOneAndDelete({_id: id})

  resolve(order)
})

// module.exports.updateProduct = (id, updateObject) => new Promise(async (resolve, reject) => {
//   try {
//     const updatedProduct = await Product.findOneAndUpdate({ _id: id, }, updateObject, { new: true })
     
//     resolve(updatedProduct)
//   } catch (e) {
//     resolve(e)
//   }
// })
