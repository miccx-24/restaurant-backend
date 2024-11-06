const MenuItem = require('../models/MenuItem');

// Controller to fetch all menu items from the database
const getMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.find({});
        // Format the response to include both MongoDB _id and a simpler id reference
        const formattedMenuItems = menuItems.map(item => ({
            _id: item._id,  // MongoDB ObjectId
            id: item._id,   // Alternative reference
            name: item.name,
            price: item.price,
            description: item.description,
            category: item.category,
        }));
        res.json(formattedMenuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to create a new menu item
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