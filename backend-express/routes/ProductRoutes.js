import BaseRouter from './BaseRouter.js';
import ProductController from '../controllers/productController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js'; 

class ProductRoutes extends BaseRouter {
  constructor() {
    // Pass Controller and Custom Middleware Config
    super(ProductController, {
      create: [AuthMiddleware.protect, AuthMiddleware.admin], // Only admin can create
      update: [AuthMiddleware.protect, AuthMiddleware.admin], // Only admin can update
      delete: [AuthMiddleware.protect, AuthMiddleware.admin], // Only admin can delete
    });
  }
}

// Export the Express Router directly
export default new ProductRoutes().getRouter();