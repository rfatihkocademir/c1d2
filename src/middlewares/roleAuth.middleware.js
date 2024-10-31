// src/middlewares/roleAuth.middleware.js

// Role Authorization Middleware
const roleAuthMiddleware = (requiredRoles) => {
    return (req, res, next) => {
      if (!req.user || !req.user.role) {
        return res.status(401).json({ message: 'Access denied. User information is missing or malformed.' });
      }
  
      const userRole = req.user.role;
      if (!requiredRoles.includes(userRole)) {
        return res.status(403).json({ 
          message: `Access denied. Insufficient permissions. User role: ${userRole}. Required roles: ${requiredRoles.join(', ')}.`
        });
      }
      next();
    };
  };
  
  module.exports = roleAuthMiddleware;
  