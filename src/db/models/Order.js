const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  items: {
    type: Array,
    required: true
  },
  shippingFee: {
    type: Number,
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

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
