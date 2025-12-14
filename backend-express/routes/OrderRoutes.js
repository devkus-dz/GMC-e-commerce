import express from 'express';
import OrderController from '../controllers/OrderController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js'; // Import Class

class OrderRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Create new order (Protected)
    this.router.post('/', AuthMiddleware.protect, OrderController.create);

    // Get my orders (Protected)
    this.router.get('/myorders', AuthMiddleware.protect, OrderController.getMyOrders);

    // Get order by ID (Protected)
    this.router.get('/:id', AuthMiddleware.protect, OrderController.getById);

    // Pay for order (Protected)
    this.router.put('/:id/pay', AuthMiddleware.protect, OrderController.updateOrderToPaid);
  }
}

export default new OrderRoutes().router;