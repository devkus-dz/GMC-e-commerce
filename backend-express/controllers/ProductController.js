import Product from '../models/Product.js';
import BaseController from './BaseController.js';

class ProductController extends BaseController {
  constructor() {
    super(Product);
  }

  // Override 'getAll' to handle Keyword Search
  getAll = async (req, res) => {
    try {
      const keyword = req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          }
        : {};

      const products = await this.model.findAll(keyword);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // getById, create, update, and delete are INHERITED automatically!
}

export default new ProductController();