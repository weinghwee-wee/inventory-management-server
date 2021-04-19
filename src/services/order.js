const { orderDB } = require('../db')

module.exports.addOrder =  (req, res) => new Promise(async (resolve, reject) => {
  const {
    name,
    location,
    phoneNo,
    total,
    items,
  } = req.body

  const response = await orderDB.createOrder(
    name,
    location,
    phoneNo,
    total,
    items,
  )

  if (response._id)  return resolve(response)

  reject(response)
})

module.exports.fetchOrders = (req, res) => new Promise(async (resolve, reject) => {
  // const { name } = req.query

  let query = {}

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

// module.exports.editProduct = (req, res) => new Promise(async (resolve, reject) => {
//   const { id } = req.params
  
//   const response = await productDB.updateProduct(id, req.body)

//   if (response._id) {
//     return resolve(response)
//   }

//   reject(response)
// })
