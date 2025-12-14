import express from 'express';
import UserController from '../controllers/UserController.js';
// 1. Import the default class instead of named functions
import AuthMiddleware from '../middlewares/authMiddleware.js'; 

class UserRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/register', UserController.registerUser);
    this.router.post('/login', UserController.loginUser);
    
    // 2. Use 'AuthMiddleware.protect' and 'AuthMiddleware.admin'
    this.router.route('/profile')
      .get(AuthMiddleware.protect, UserController.getUserProfile)
      .put(AuthMiddleware.protect, UserController.updateUserProfile);

    this.router.get('/', 
      AuthMiddleware.protect, 
      AuthMiddleware.admin, 
      UserController.getAll // Inherited from BaseController
    ); 

    this.router.delete('/:id', 
      AuthMiddleware.protect, 
      AuthMiddleware.admin, 
      UserController.delete
    );
  }
}

export default new UserRoutes().router;