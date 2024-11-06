const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Database connection function
const connectDB = async () => {
    try {
        // Connect to MongoDB using environment variables
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB by Macdonald Sairos connected successfully!!');
    } catch (error) {
        // Log error and exit process on connection failure
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;