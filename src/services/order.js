const { orderDB } = require('../db')

module.exports.addOrder =  (req, res) => new Promise(async (resolve, reject) => {
  const { _id } = req.user

  const {
    name,
    location,
    phoneNo,
    total,
    items,
    shippingFee
  } = req.body

  const response = await orderDB.createOrder(
    name,
    location,
    phoneNo,
    total,
    items,
    shippingFee,
    _id
  )

  if (response._id)  return resolve(response)

  reject(response)
})

module.exports.fetchOrders = (req, res) => new Promise(async (resolve, reject) => {
  // const { name } = req.query

  let query = {
    createdBy: req.user._id
  }

  // if (name) {
  //   query.name = {
  //     '$regex': name, '$options' : 'i'
  //   }
  // }

  const response = await orderDB.retrieveOrders(query)

  resolve(response)
})

module.exports.removeOrder = (req, res) => new Promise(async (resolve, reject) => {
  const { id } = req.params
  
  const response = await orderDB.deleteOrder(id)

  resolve(response)
})

module.exports.editOrder = (req, res) => new Promise(async (resolve, reject) => {
  const { id } = req.params
  
  const response = await orderDB.updateOrder(id, req.body)

  if (response._id) {
    return resolve(response)
  }

  reject(response)
})
