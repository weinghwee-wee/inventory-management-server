// require library to read environment variable from .env
require("dotenv").config();

// connect to db
require("./src/db/mongoose");

const express = require("express")
const bodyParser = require("body-parser");
const cors = require("cors");
const { requestHandler } = require('./src/utils')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const publicRoute = (requestMethod, routeName, method) => {
  return app[requestMethod](routeName, requestHandler(method, false))
}

const privateRoute = (requestMethod, routeName, method) => {
  return app[requestMethod](routeName, requestHandler(method, true))
}

const { user } = require('./src/services')
publicRoute('post', '/user', user.registerUser)

const { auth } = require('./src/services')
publicRoute('post', '/login', auth.loginUser)
publicRoute('post', '/logout', auth.logoutUser)

const { product } = require('./src/services')
privateRoute('post', '/product', product.addProduct)
privateRoute('delete', '/product/:id', product.removeProduct)
privateRoute('get', '/products', product.fetchProducts)
privateRoute('put', '/product/:id', product.editProduct)
privateRoute('post', '/restock', product.restockProduct)

const { order } = require('./src/services')
privateRoute('post', '/order', order.addOrder)
privateRoute('get', '/orders', order.fetchOrders)
privateRoute('delete', '/order/:id', order.removeOrder)
privateRoute('put', '/order/:id', order.editOrder)

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})

