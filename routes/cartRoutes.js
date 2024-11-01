// routes/cartRoutes.js
const express = require('express');
const { addToCart, removeFromCart, getCart, clearCart } = require('../controllers/cartController');

const router = express.Router();

// Add an item to the cart
router.post('/add', addToCart);

// Remove an item from the cart
router.delete('/remove/:itemId', removeFromCart);

// Get the current cart
router.get('/', getCart);

// Clear the cart
router.delete('/clear', clearCart);

module.exports = router;