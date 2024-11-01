const mongoose = require('mongoose');
const Order = require('../models/Order');

// Create a new order
const createOrder = async (req, res, next) => {
    try {
        const { items } = req.body;
        
        // Check if items exist
        if (!items || !Array.isArray(items)) {
            return res.status(400).json({
                message: 'Invalid request format',
                details: 'Order must include an items array'
            });
        }

        // Log received items for debugging
        console.log('Received items:', items);

        // Check each item and collect invalid IDs
        const invalidItems = items.filter(item => 
            !mongoose.Types.ObjectId.isValid(item.menuItemId)
        );

        if (invalidItems.length > 0) {
            return res.status(400).json({
                message: 'Invalid menu item ID format',
                details: `Invalid IDs found: ${invalidItems.map(item => item.menuItemId).join(', ')}`,
                receivedData: items
            });
        }

        // Convert string IDs to ObjectIds
        const processedItems = items.map(item => ({
            ...item,
            menuItemId: new mongoose.Types.ObjectId(item.menuItemId)
        }));

        const order = await Order.create({ ...req.body, items: processedItems });
        res.status(201).json(order);
    } catch (error) {
        console.error('Order creation error:', error);
        next(error);
    }
};

module.exports = { createOrder };