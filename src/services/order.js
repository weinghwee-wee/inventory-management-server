const { orderDB } = require('../db')
const { productHelpers } = require('../helpers')

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

  const availabilityProblem = await productHelpers.checkProductAvailability(req.body.items)

  if (availabilityProblem) {
    return reject(availabilityProblem)
  }

  const response = await orderDB.createOrder(
    name,
    location,
    phoneNo,
    total,
    items,
    shippingFee,
    _id
  )

  await productHelpers.updateProductStock(items, null, 'create')

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
  
  await productHelpers.updateProductStock([], id, 'delete')

  const response = await orderDB.deleteOrder(id)

  resolve(response)
})

module.exports.editOrder = (req, res) => new Promise(async (resolve, reject) => {
  const { id } = req.params
  const { status, items } = req.body

  if (!status) {
    const availabilityProblem = await productHelpers.checkProductAvailability(items, id)

    if (availabilityProblem) {
      return reject(availabilityProblem)
    }
  
    await productHelpers.updateProductStock(items, id, 'edit')
  }
  
  const response = await orderDB.updateOrder(id, req.body)

  if (response._id) {
    return resolve(response)
  }

  reject(response)
})
