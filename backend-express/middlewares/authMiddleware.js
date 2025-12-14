import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class AuthMiddleware {
  /**
   * Middleware to verify JWT token and protect private routes
   */
  static protect = async (req, res, next) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header (Format: "Bearer <token>")
        token = req.headers.authorization.split(' ')[1];

        // Decode token to get User ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user from DB (excluding password) and attach to request
        req.user = await User.findById(decoded.id);
        
        // Remove password from the user object for security in controllers
        req.user.password = undefined; 
        
        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Not authorized, token failed' });
      }
    }

    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
    }
  };

  /**
   * Middleware to ensure user is an Admin
   */
  static admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) { 
      next();
    } else {
      res.status(401).json({ message: 'Not authorized as an admin' });
    }
  };
}

export default AuthMiddleware;