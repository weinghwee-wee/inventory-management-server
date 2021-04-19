const { Order } = require('./models')

module.exports.createOrder = (name, location, phoneNo, total, items) => new Promise(async (resolve, reject) => {
  const newOrder =  new Order({  
    name,
    location,
    phoneNo,
    date: new Date(),
    status: 'New',
    total,
    items,
  })

  try {
    const order = await newOrder.save()

    resolve(order)
  } catch (e) {
    resolve(e)
  }
})

// module.exports.retrieveProducts = (query) => new Promise(async (resolve, reject) => {
//   const products = await Product.find(query)

//   resolve(products)
// })

// module.exports.deleteProduct = (id) => new Promise(async (resolve, reject) => {
//   const product = await Product.findOneAndDelete({_id: id})

//   resolve(product)
// })

// module.exports.updateProduct = (id, updateObject) => new Promise(async (resolve, reject) => {
//   try {
//     const updatedProduct = await Product.findOneAndUpdate({ _id: id, }, updateObject, { new: true })
     
//     resolve(updatedProduct)
//   } catch (e) {
//     resolve(e)
//   }
// })
