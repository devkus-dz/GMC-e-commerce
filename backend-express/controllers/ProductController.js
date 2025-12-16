import Product from '../models/Product.js';
import BaseController from './BaseController.js';

class ProductController extends BaseController {
  constructor() {
    super(Product);
  }

  // Override 'getAll' to handle Keyword Search adn Pagination
  getAll = async (req, res) => {
    try {
      const pageSize = Number(req.query.limit) || 8; // Default 8 products per page
      const page = Number(req.query.pageNumber) || 1;

      // Build the keyword filter
      const keyword = req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          }
        : {};

      // Call the new BaseModel method
      const result = await this.model.findPaginated(keyword, page, pageSize);

      // Result looks like: { items: [...], page: 1, pages: 5, count: 40 }
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // getById, create, update, and delete are INHERITED automatically!
}

export default new ProductController();