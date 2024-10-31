// app.js

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

// Middleware imports
const errorHandler = require('./src/middlewares/error.middleware.js');
const authMiddleware = require('./src/middlewares/auth.middleware.js');
const rateLimiter = require('./src/middlewares/rateLimiter.middleware.js');

// Route imports
const userRoutes = require('./src/routes/user/user.routes.js');
const scenarioRoutes = require('./src/routes/scenario/scenario.routes.js');
const runRoutes = require('./src/routes/run/run.routes.js');

const app = express();

// Global middlewares
app.use(helmet()); // For security headers
app.use(cors()); // For cross-origin requests
app.use(morgan('dev')); // For logging requests
app.use(express.json()); // For parsing JSON request bodies
app.use(rateLimiter); // Rate limiting middleware

// Routes
app.use('/api/users', userRoutes);
app.use('/api/scenarios', scenarioRoutes);
app.use('/api/runs', runRoutes);

// Error handling middleware
app.use(errorHandler);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).send('API is up and running');
});

module.exports = app;
