// src/middlewares/requestLogger.middleware.js

const winston = require('winston');

// Configure Winston Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/requests.log' })
  ]
});

// Request Logger Middleware
const requestLogger = (req, res, next) => {
  const { method, url, headers, body } = req;
  const { authorization, ...safeHeaders } = headers;
  const logMessage = {
    message: 'Incoming Request',
    method,
    url,
    headers: safeHeaders,
    body,
    timestamp: new Date().toISOString()
  };
  logger.info(logMessage);
  next();
};

module.exports = requestLogger;
