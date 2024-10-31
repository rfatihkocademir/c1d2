// src/routes/scenario/scenario.routes.js

const express = require('express');
const router = express.Router();

// Controllers
const ScenarioController = require('../../controllers/scenario.controller.js');

// Middleware imports
const jwtAuthMiddleware = require('../../middlewares/jwtAuth.middleware');
const validateScenarioInput = require('../../middlewares/validateScenarioInput.middleware.js');
const rateLimiter = require('../../middlewares/rateLimiter.middleware');
const cacheMiddleware = require('../../middlewares/cache.middleware');
const validateIdParam = require('../../middlewares/validateIdParam.middleware.js');

// Apply rate limiter to all routes
router.use(rateLimiter);

// Scenario CRUD routes

// Create a new scenario
router.post('/', jwtAuthMiddleware, validateScenarioInput, ScenarioController.createScenario);

// Get all scenarios for the authenticated user
router.get('/', jwtAuthMiddleware, cacheMiddleware, ScenarioController.getAllScenarios);

// Get a specific scenario by ID
router.get('/:id', jwtAuthMiddleware, validateIdParam, ScenarioController.getScenarioById);

// Update a scenario by ID
router.put('/:id', jwtAuthMiddleware, validateIdParam, validateScenarioInput, ScenarioController.updateScenario);

// Delete a scenario by ID
router.delete('/:id', jwtAuthMiddleware, validateIdParam, ScenarioController.deleteScenario);

module.exports = router;
