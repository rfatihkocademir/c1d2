// src/routes/run/run.routes.js

const express = require('express');
const router = express.Router();

// Controllers
const RunController = require('../../controllers/run.controller.js');

// Middleware imports
const jwtAuthMiddleware = require('../../middlewares/jwtAuth.middleware');
const validateRunInput = require('../../middlewares/validateRunInput.middleware');
const rateLimiter = require('../../middlewares/rateLimiter.middleware');
const validateIdParam = require('../../middlewares/validateIdParam.middleware');

// Apply rate limiter to all routes
router.use(rateLimiter);

// Run management routes

// Start a new run
router.post('/', jwtAuthMiddleware, validateRunInput, RunController.startRun);

// Get all runs for the authenticated user
router.get('/', jwtAuthMiddleware, RunController.getAllRuns);

// Get a specific run by ID
router.get('/:id', jwtAuthMiddleware, validateIdParam, RunController.getRunById);

// Stop a run by ID
router.put('/:id/stop', jwtAuthMiddleware, validateIdParam, RunController.stopRun);

// Delete a run by ID
router.delete('/:id', jwtAuthMiddleware, validateIdParam, RunController.deleteRun);

module.exports = router;
