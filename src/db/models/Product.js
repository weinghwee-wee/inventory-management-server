const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  buyPrice: {
    type: Number,
    required: true,
  },
  sellPrice: {
    type: Number,
    required: true,
  },
  availableStock: {
    type: Number,
    required: true,
  },
  totalSold: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
