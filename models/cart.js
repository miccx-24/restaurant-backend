const mongoose = require('mongoose');

// Schema definition for shopping cart
const cartSchema = new mongoose.Schema({
    // User identifier for cart ownership
    userId: { type: String, required: true },
    
    // Array of items in the cart
    items: [
        {
            // Reference to the MenuItem collection
            menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
            // Quantity must be at least 1
            quantity: { type: Number, required: true, min: 1 },
        },
    ],
}, { timestamps: true }); // Automatically add createdAt and updatedAt timestamps

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;