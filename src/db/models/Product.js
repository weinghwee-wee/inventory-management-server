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

productSchema.index({name: 'text'})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
