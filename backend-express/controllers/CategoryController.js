import Category from '../models/Category.js';
import BaseController from './BaseController.js';

class CategoryController extends BaseController {
  constructor() {
    super(Category); // Pass the model to the parent
  }

  // Override 'create' only because we want to check for duplicates first
  create = async (req, res) => {
    try {
      const { name } = req.body;
      const existingCategory = await this.model.model.findOne({ name });
      
      if (existingCategory) {
        return res.status(400).json({ message: 'Category already exists' });
      }

      // Call the parent method's logic or custom logic
      // Since parent.create is simple, we just write the custom creation here
      const category = await this.model.create(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
}

export default new CategoryController();