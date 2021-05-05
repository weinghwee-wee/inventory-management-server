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

const route = (requestMethod, routeName, method, noAuth) => {
  return app[requestMethod](routeName, requestHandler(method, noAuth))
}

const { product } = require('./src/services')
route('post', '/product', product.addProduct)
route('delete', '/product/:id', product.removeProduct)
route('get', '/products', product.fetchProducts)
route('put', '/product/:id', product.editProduct)

const { order } = require('./src/services')
route('post', '/order', order.addOrder)
route('get', '/orders', order.fetchOrders)
route('delete', '/order/:id', order.removeOrder)
route('put', '/order/:id', order.editOrder)

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})

