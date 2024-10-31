// src/middlewares/validateRegisterInput.middleware.js

const { body, validationResult } = require('express-validator');

// Register Input Validation Middleware
const validateRegisterInput = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address.'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.'),
  body('name')
    .isString()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateRegisterInput;
