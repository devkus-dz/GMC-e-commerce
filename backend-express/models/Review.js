import mongoose from 'mongoose';
import BaseModel from './BaseModel.js';

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Store user name for display speed
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', 
    },
    
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product', 
    },
  },
  {
    timestamps: true,
  }
);

// Create the Mongoose Model
const MongooseReview = mongoose.model('Review', reviewSchema);

class ReviewModel extends BaseModel {
  constructor() {
    super(MongooseReview);
  }

  /**
   * Find all reviews for a specific product
   * @param {string} productId
   */
  async findByProduct(productId) {
    return await this.model.find({ product: productId }).sort({ createdAt: -1 });
  }

  /**
   * Calculate the average rating for a product
   * This aggregation is efficient for calculating the new score when a review is added
   * @param {string} productId
   */
  async calculateStats(productId) {
    const stats = await this.model.aggregate([
      {
        $match: { product: new mongoose.Types.ObjectId(productId) }
      },
      {
        $group: {
          _id: '$product',
          averageRating: { $avg: '$rating' },
          numReviews: { $sum: 1 }
        }
      }
    ]);
    
    // Return stats or default values if no reviews exist
    return stats.length > 0 
      ? { rating: stats[0].averageRating, numReviews: stats[0].numReviews } 
      : { rating: 0, numReviews: 0 };
  }
}

export default new ReviewModel();