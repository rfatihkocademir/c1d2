// src/middlewares/validateIdParam.middleware.js

// Import necessary functions from express-validator
const { param, validationResult } = require('express-validator');

// Middleware to validate 'id' parameter in the request
const validateIdParam = [
  // Validate that the 'id' parameter is a valid UUID
  param('id')
    .isUUID()
    .withMessage('Invalid ID format. The ID must be a valid UUID.'),
  
  // Middleware to check for validation errors
  (req, res, next) => {
    // Extract validation errors from the request
    const errors = validationResult(req);

    // If there are validation errors, respond with a 400 status and error details
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If no errors, proceed to the next middleware or route handler
    next();
  },
];

// Export the middleware for use in other parts of the application
module.exports = validateIdParam;
