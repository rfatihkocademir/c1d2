// src/middlewares/compression.middleware.js

const compression = require('compression');

// Compression Middleware with configuration options
const compressionMiddleware = compression({
  threshold: 1024, // Only compress responses larger than 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      return false;
    }
    // fallback to standard filter function
    return compression.filter(req, res);
  },
});

module.exports = compressionMiddleware;
