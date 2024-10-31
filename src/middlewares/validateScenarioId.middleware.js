// src/middlewares/validateScenarioId.middleware.js

const { param, validationResult } = require('express-validator');

// Scenario ID Validation Middleware
const validateScenarioId = [
  param('id')
    .isUUID()
    .withMessage('Scenario ID must be a valid UUID.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateScenarioId;
