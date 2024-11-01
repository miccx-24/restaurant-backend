const MenuItem = require('../models/MenuItem');

// Get all menu items
const getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find({});
        // Include both the MongoDB _id and a simpler id for reference
        const formattedMenuItems = menuItems.map(item => ({
            _id: item._id,  // This is the MongoDB ObjectId you should use
            id: item._id,   // This is the same, just for clarity
            name: item.name,
            price: item.price,
            description: item.description,
            category: item.category,
            // ... other fields
        }));
        res.json(formattedMenuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new menu item
const createMenuItem = async (req, res) => {
    const { name, description, price, image, category, prepTime } = req.body;
    const menuItem = new MenuItem({ name, description, price, image, category, prepTime });

    try {
        const savedItem = await menuItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getMenuItems, createMenuItem };