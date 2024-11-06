const mongoose = require('mongoose');

// Schema definition for menu items in the restaurant
const menuItemSchema = new mongoose.Schema({
    // Name of the dish/item
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    
    // Detailed description of the menu item
    description: { 
        type: String, 
        required: true,
        trim: true 
    },
    
    // Price in dollars (stored as decimal)
    price: { 
        type: Number, 
        required: true,
        min: 0,
        get: v => (v/100).toFixed(2),
        set: v => v * 100
    },
    
    // URL or path to the item's image
    image: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(v);
            },
            message: props => `${props.value} is not a valid image URL!`
        }
    },
    
    // Category of the item with predefined options
    category: { 
        type: String, 
        required: true, 
        enum: ['mains', 'sides', 'drinks', 'desserts'],
        lowercase: true
    },
    
    // Estimated preparation time for the item
    prepTime: { 
        type: String, 
        required: true 
    },

    // Rating of the item
    rating: {
        type: Number,
        default: 4.8,
        min: 0,
        max: 5
    }
}, {
    timestamps: true,
    toJSON: { getters: true }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;