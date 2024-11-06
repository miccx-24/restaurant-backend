// Middleware for handling 404 Not Found errors
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error details:', err);
  
  // Determine appropriate status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Handle Mongoose casting errors (e.g., invalid ObjectId)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({
      message: 'Invalid ID format',
      details: 'Please ensure you are using valid MongoDB ObjectId format',
      invalidValue: err.value
    });
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Validation Error',
      details: Object.values(err.errors).map(e => e.message)
    });
  }

  // Send error response
  res.status(statusCode).json({
    message: err.message,
    // Only show detailed error stack in development
    details: process.env.NODE_ENV === 'production' ? 'An error occurred' : err.stack,
    timestamp: new Date().toISOString()
  });
};

module.exports = { notFound, errorHandler };
