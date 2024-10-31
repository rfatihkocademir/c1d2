// src/middlewares/cache.middleware.js

const redis = require('redis');
const { promisify } = require('util');

// Create Redis client
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});

redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});

// Promisify Redis get and set methods
const getAsync = promisify(redisClient.get).bind(redisClient);
const setAsync = promisify(redisClient.set).bind(redisClient);

// Cache Middleware
const cacheMiddleware = (duration = 60) => {
  return async (req, res, next) => {
    try {
      const key = '__express__' + (req.originalUrl || req.url);
      const cachedBody = await getAsync(key);
      if (cachedBody) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.parse(cachedBody));
        return;
      } else {
        res.sendResponse = res.send;
        res.send = async (body) => {
          if (res.statusCode === 200 && body && Buffer.byteLength(JSON.stringify(body), 'utf8') < 50000) { // Only cache successful responses, ensure body is not empty, and limit size to 50KB
            await setAsync(key, JSON.stringify(body), 'EX', duration);
          }
          res.sendResponse(body);
        };
        next();
      }
    } catch (error) {
      console.error(`Redis error on request to ${req.originalUrl || req.url}:`, error);
      next();
    }
  };
};

module.exports = cacheMiddleware;
