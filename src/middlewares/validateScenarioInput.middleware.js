// src/middlewares/validateScenarioInput.middleware.js

const { body, validationResult } = require('express-validator');

// Scenario Input Validation Middleware
const validateScenarioInput = [
  body('name')
    .isString()
    .isLength({ min: 3 })
    .withMessage('Scenario name must be at least 3 characters long.'),
  body('steps')
    .isArray({ min: 1 })
    .withMessage('Steps must be an array with at least one step.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateScenarioInput;
