import Review from '../models/Review.js';
import Product from '../models/Product.js';
import BaseController from './BaseController.js';

class ReviewController extends BaseController {
  constructor() {
    super(Review);
  }

  /**
   * @desc    Create new review
   * @override BaseController.create
   */
  create = async (req, res) => {
    try {
      const { rating, comment } = req.body;
      const productId = req.params.id; // Passed via URL
      const userId = req.user.id;
      const userName = req.user.name;

      // 1. Check if user already reviewed this product
      const alreadyReviewed = await this.model.findAll({
        product: productId,
        user: userId
      });

      if (alreadyReviewed.length > 0) {
        return res.status(400).json({ message: 'Product already reviewed' });
      }

      // 2. Create the review
      await this.model.create({
        name: userName,
        rating: Number(rating),
        comment,
        user: userId,
        product: productId,
      });

      // 3. Update Product Stats (Average Rating)
      const stats = await this.model.calculateStats(productId);

      await Product.update(productId, {
        rating: stats.rating,
        numReviews: stats.numReviews
      });

      res.status(201).json({ message: 'Review added' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  /**
   * @desc    Get reviews for a product
   * @route   GET /api/reviews/:id
   */
  getProductReviews = async (req, res) => {
    try {
      const reviews = await this.model.findByProduct(req.params.id);
      res.json(reviews);
    } catch (error) {
      res.status(404).json({ message: 'Product not found' });
    }
  };
}

export default new ReviewController();