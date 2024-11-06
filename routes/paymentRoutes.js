const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');
const Order = require('../models/Order');

router.get('/test', (req, res) => {
  res.json({ message: 'Payment routes are working' });
});

router.post('/process', async (req, res) => {
  try {
    const { cardNumber, name, expiryDate, cvv, amount, orderId } = req.body;

    // Add some console.logs for debugging
    console.log('Payment request received:', {
      name,
      amount,
      orderId,
      cardLast4: cardNumber.slice(-4)
    });

    // Basic validation
    if (!cardNumber || !name || !expiryDate || !cvv || !amount || !orderId) {
      return res.status(400).json({ 
        error: 'All fields are required',
        received: {
          hasCardNumber: !!cardNumber,
          hasName: !!name,
          hasExpiryDate: !!expiryDate,
          hasCvv: !!cvv,
          hasAmount: !!amount,
          hasOrderId: !!orderId
        }
      });
    }

    // Validate card number using Luhn algorithm
    if (!isValidCreditCard(cardNumber.replace(/\s/g, ''))) {
      return res.status(400).json({ error: 'Invalid card number' });
    }

    // In a real application, you would:
    // 1. Integrate with a payment processor (Stripe, PayPal, etc.)
    // 2. Use proper encryption for sensitive data
    // 3. Implement proper PCI compliance measures

    // Create payment record
    const payment = new Payment({
      orderId,
      amount,
      cardholderName: name,
      lastFourDigits: cardNumber.slice(-4),
      cardBrand: getCardBrand(cardNumber),
      status: 'completed' // Simulating successful payment
    });

    await payment.save();

    // Update order status
    await Order.findByIdAndUpdate(orderId, { status: 'paid' });

    res.json({ 
      success: true, 
      message: 'Payment processed successfully',
      paymentId: payment._id
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({ 
      error: 'Payment processing failed',
      details: error.message 
    });
  }
});

// Luhn algorithm implementation
function isValidCreditCard(number) {
  let sum = 0;
  let isEven = false;
  
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number.charAt(i));

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

// Card brand detection
function getCardBrand(cardNumber) {
  const patterns = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    discover: /^6(?:011|5)/,
  };

  const number = cardNumber.replace(/\s+/g, '');
  for (const [brand, pattern] of Object.entries(patterns)) {
    if (pattern.test(number)) return brand;
  }
  return 'unknown';
}

module.exports = router; 