const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Important! This parses JSON bodies
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Routes
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    details: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: `Not Found - ${req.originalUrl}`,
    timestamp: new Date().toISOString()
  });
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 