// src/middlewares/validateRunInput.middleware.js

const { body, validationResult } = require('express-validator');

// Run Input Validation Middleware
const validateRunInput = [
  body('scenarioId')
    .isUUID()
    .withMessage('Please provide a valid scenario ID in UUID format.'),
  body('runParameters')
    .optional()
    .isObject()
    .withMessage('Run parameters must be a valid object if provided.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateRunInput;
