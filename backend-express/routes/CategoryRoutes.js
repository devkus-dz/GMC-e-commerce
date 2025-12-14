import BaseRouter from './BaseRouter.js';
import CategoryController from '../controllers/categoryController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js'; // Import Class

class CategoryRoutes extends BaseRouter {
  constructor() {
    super(CategoryController, {
      create: [AuthMiddleware.protect, AuthMiddleware.admin],
      update: [AuthMiddleware.protect, AuthMiddleware.admin],
      delete: [AuthMiddleware.protect, AuthMiddleware.admin],
    });
  }
}

export default new CategoryRoutes().getRouter();