const express = require('express');
const { createOrder } = require('../controllers/orderController');
const { processPayment } = require('../controllers/paymentController');

const router = express.Router();

router.post('/', createOrder);
router.post('/payment', processPayment); // Route to process payment

module.exports = router;