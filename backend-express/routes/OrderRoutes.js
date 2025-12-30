import express from 'express';
import OrderController from '../controllers/OrderController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js';

class OrderRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // ---------------------------------------------------------
    // 1. Root Route ('/') 
    // POST: Create Order (User)
    // GET:  Get All Orders (Admin Only) -> THIS WAS MISSING
    // ---------------------------------------------------------
    this.router.route('/')
      .post(AuthMiddleware.protect, OrderController.create)
      .get(AuthMiddleware.protect, AuthMiddleware.admin, OrderController.getAllOrders);

    // ---------------------------------------------------------
    // 2. Specific Routes (Must come BEFORE /:id)
    // ---------------------------------------------------------
    this.router.get('/myorders', AuthMiddleware.protect, OrderController.getMyOrders);

    // ---------------------------------------------------------
    // 3. ID Routes (/:id)
    // ---------------------------------------------------------
    this.router.get('/:id', AuthMiddleware.protect, OrderController.getById);

    this.router.put('/:id/pay', AuthMiddleware.protect, OrderController.updateOrderToPaid);

    this.router.put(
      '/:id/deliver', 
      AuthMiddleware.protect, 
      AuthMiddleware.admin, 
      OrderController.updateOrderToDelivered
    );
  }
}

export default new OrderRoutes().router;