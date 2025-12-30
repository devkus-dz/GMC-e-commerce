import Product from '../models/Product.js';
import BaseController from './BaseController.js';

class ProductController extends BaseController {
  constructor() {
    super(Product);
  }

  getAll = async (req, res) => {
    try {
      const limitQuery = req.query.limit;
      const pageSize = limitQuery && !isNaN(limitQuery) ? Number(limitQuery) : 0;
      
      const pageQuery = req.query.pageNumber;
      const page = pageQuery && !isNaN(pageQuery) ? Number(pageQuery) : 1;

      // --- BUILD QUERY ---
      const query = {};
      
      // 1. Search Logic
      if (req.query.keyword) {
        query.name = { $regex: req.query.keyword, $options: 'i' };
      }

      // 2. Category Logic (ADD THIS BLOCK)
      if (req.query.category) {
        query.category = req.query.category;
      }
      // -------------------

      const count = await this.model.model.countDocuments({ ...query });

      const items = await this.model.model.find({ ...query })
        .populate('category', 'name')
        .limit(pageSize)
        .skip(pageSize > 0 ? pageSize * (page - 1) : 0)
        .sort({ createdAt: -1 });

      res.json({ 
        items, 
        page, 
        pages: pageSize > 0 ? Math.ceil(count / pageSize) : 1, 
        count 
      });

    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: error.message });
    }
  };
}

export default new ProductController();