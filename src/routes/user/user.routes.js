// src/routes/user/user.routes.js

const express = require('express');
const router = express.Router();

// Controllers
const UserController = require('../../controllers/user.controller.js');

// Middleware imports
const jwtAuthMiddleware = require('../../middlewares/jwtAuth.middleware.js');
const validateRegisterInput = require('../../middlewares/validateRegisterInput.middleware.js');
const rateLimiter = require('../../middlewares/rateLimiter.middleware.js');
const loginRateLimiter = require('../../middlewares/loginRateLimiter.middleware.js');
const cacheMiddleware = require('../../middlewares/cache.middleware.js');
const validateProfileUpdateInput = require('../../middlewares/validateProfileUpdateInput.middleware.js');

// Sub-router for user authentication routes
const authRouter = express.Router();
authRouter.post('/register', validateRegisterInput, UserController.registerUser);
authRouter.post('/login', loginRateLimiter, UserController.loginUser);

// Sub-router for user profile routes
const profileRouter = express.Router();
profileRouter.get('/', jwtAuthMiddleware, cacheMiddleware, UserController.getUserProfile);
profileRouter.put('/', jwtAuthMiddleware, validateProfileUpdateInput, UserController.updateUserProfile);

// Main user router
router.use('/auth', authRouter);
router.use('/profile', profileRouter);

module.exports = router;
