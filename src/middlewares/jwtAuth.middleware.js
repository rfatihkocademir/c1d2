// src/middlewares/jwtAuth.middleware.js

const jwt = require('jsonwebtoken');

// JWT Authentication Middleware
const jwtAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.setHeader('WWW-Authenticate', 'Bearer');
    return res.status(401).json({ message: 'Access denied. No token provided or invalid format.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.setHeader('WWW-Authenticate', 'Bearer');
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    req.user = decoded;
    next();
  });
};

module.exports = jwtAuthMiddleware;
