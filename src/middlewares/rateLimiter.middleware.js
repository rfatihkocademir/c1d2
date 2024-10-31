// src/middlewares/rateLimiter.middleware.js

const rateLimit = require('express-rate-limit');

// Rate Limiter Middleware
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (15 minutes)
  message: 'Too many requests from this IP, please try again later.',
  headers: true,
});

module.exports = rateLimiter;
