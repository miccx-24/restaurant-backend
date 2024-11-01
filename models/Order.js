const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [
        {
            menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
            quantity: { type: Number, required: true },
        },
    ],
    total: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;