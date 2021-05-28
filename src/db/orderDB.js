const { Order } = require('./models')

module.exports.createOrder = (name, location, phoneNo, total, items, shippingFee, createdBy) => new Promise(async (resolve, reject) => {
  const newOrder =  new Order({  
    name,
    location,
    phoneNo,
    date: new Date(),
    status: 'New',
    total,
    items,
    shippingFee,
    createdBy
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

module.exports.updateOrder = (id, updateObject) => new Promise(async (resolve, reject) => {
  try {
    const updatedOrder = await Order.findOneAndUpdate({ _id: id, }, updateObject, { new: true })
     
    resolve(updatedOrder)
  } catch (e) {
    resolve(e)
  }
})

module.exports.getOrderById = (id) => new Promise(async (resolve, reject) => {
  const order = await Order.findById(id)

  resolve(order)
})
