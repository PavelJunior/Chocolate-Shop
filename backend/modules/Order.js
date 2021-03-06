const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  fullAddress: {
    type: String,
    required: true,
  },
  chargeId: {
    type: String,
    required: true,
  },
  orderItems: {
    type: [{id: String, name: String, price: Number, quantity: Number}],
    required: true,
  },
});

const Order = mongoose.model('order', orderSchema);
module.exports = Order;
