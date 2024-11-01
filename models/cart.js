const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [
        {
            menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
            quantity: { type: Number, required: true, min: 1 },
        },
    ],
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;