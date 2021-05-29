const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true
})

const Purchase = mongoose.model('Purchase', purchaseSchema)

module.exports = Purchase
