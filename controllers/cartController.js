// controllers/cartController.js
const Cart = require('../models/cart');

// Add an item to the cart
exports.addToCart = async (req, res) => {
    console.log('Request body:', req.body);
    const { menuItemId, quantity } = req.body;

    try {
        // Validate input
        if (!menuItemId || !quantity) {
            return res.status(400).json({
                message: 'menuItemId and quantity are required'
            });
        }

        // Initialize cart in session if it doesn't exist
        if (!req.session.cart) {
            req.session.cart = { items: [] };
        }

        const existingItem = req.session.cart.items.find(item => item.menuItemId === menuItemId);
        if (existingItem) {
            existingItem.quantity += parseInt(quantity);
        } else {
            req.session.cart.items.push({ 
                menuItemId, 
                quantity: parseInt(quantity) 
            });
        }

        // Save session explicitly
        req.session.save((err) => {
            if (err) {
                console.error('Session save error:', err);
                return res.status(500).json({ 
                    message: 'Error saving cart', 
                    error: err.message 
                });
            }
            
            res.status(201).json({ 
                message: 'Item added to cart', 
                cart: req.session.cart 
            });
        });

    } catch (error) {
        console.error('Cart error:', error);
        res.status(500).json({ 
            message: 'Error adding item to cart', 
            error: error.message 
        });
    }
};

// Remove an item from the cart
exports.removeFromCart = async (req, res) => {
    const { itemId } = req.params;

    try {
        if (!req.session.cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        req.session.cart.items = req.session.cart.items.filter(item => item.itemId !== itemId);
        res.status(200).json({ 
            message: 'Item removed from cart', 
            cart: req.session.cart 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart', error });
    }
};

// Get the current cart
exports.getCart = async (req, res) => {
    try {
        if (!req.session.cart) {
            req.session.cart = { items: [] };
        }
        res.status(200).json(req.session.cart);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error });
    }
};

// Clear the cart
exports.clearCart = async (req, res) => {
    try {
        req.session.cart = { items: [] };
        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart', error });
    }
};