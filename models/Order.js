const mongoose = require('mongoose');

// Schema definition for customer orders
const orderSchema = new mongoose.Schema({
    // Array of items in the order
    items: [
        {
            // Reference to the MenuItem collection
            menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
            // Quantity of this particular item
            quantity: { type: Number, required: true },
        },
    ],
    // Total cost of the order
    total: { type: Number, required: true },
    // Timestamp when the order was created
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;