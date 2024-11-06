const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  cardholderName: {
    type: String,
    required: true
  },
  // Store last 4 digits only for reference
  lastFourDigits: {
    type: String,
    required: true
  },
  cardBrand: {
    type: String,
    enum: ['visa', 'mastercard', 'amex', 'discover', 'unknown'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Don't store full card details for security/compliance
paymentSchema.methods.maskCardNumber = function(cardNumber) {
  return cardNumber.slice(-4);
};

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;