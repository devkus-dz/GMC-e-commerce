import express from 'express';
import ReviewController from '../controllers/ReviewController.js';
import AuthMiddleware from '../middlewares/authMiddleware.js'; // Import Class

class ReviewRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    // Create review (Protected: You must be logged in to review)
    this.router.post('/:id', AuthMiddleware.protect, ReviewController.create);

    // Get reviews (Public: Anyone can read reviews)
    this.router.get('/:id', ReviewController.getProductReviews);
  }
}

export default new ReviewRoutes().router;