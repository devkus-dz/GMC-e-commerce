class BaseController {
    /**
     * @param {Object} model - The service/model instance (e.g., ProductModel)
     */
    constructor(model) {
      this.model = model;
    }
  
    /**
     * @desc    Get all items
     * @route   GET /api/:resource
     */
    // Generic Get All
    getAll = async (req, res) => {
      try {
        // 1. Check if limit is provided in Query
        const hasLimit = req.query.limit !== undefined;
        
        // 2. Set pagination variables
        // If limit is provided, use it. If not, use 0 (Mongoose 0 = No Limit / Fetch All)
        const limit = hasLimit ? Number(req.query.limit) : 0; 
        const page = Number(req.query.pageNumber) || 1;
        const skip = limit > 0 ? limit * (page - 1) : 0;

        // 3. Query
        // We use 'this.model.model' to access the raw Mongoose model if using your wrapper
        const count = await this.model.model.countDocuments({});
        
        const items = await this.model.model.find({})
          .limit(limit)
          .skip(skip)
          .sort({ createdAt: -1 });

        // 4. Return consistent structure
        res.json({
          items,
          page,
          pages: limit > 0 ? Math.ceil(count / limit) : 1, // If no limit, only 1 page exists
          count
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
  
    /**
     * @desc    Get item by ID
     * @route   GET /api/:resource/:id
     */
    getById = async (req, res) => {
      try {
        const item = await this.model.findById(req.params.id);
        if (item) {
          res.json(item);
        } else {
          res.status(404).json({ message: 'Item not found' });
        }
      } catch (error) {
        res.status(404).json({ message: 'Item not found' });
      }
    };
  
    /**
     * @desc    Create new item
     * @route   POST /api/:resource
     */
    create = async (req, res) => {
      try {
        const item = await this.model.create(req.body);
        res.status(201).json(item);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };
  
    /**
     * @desc    Update item
     * @route   PUT /api/:resource/:id
     */
    update = async (req, res) => {
      try {
        const updatedItem = await this.model.update(req.params.id, req.body);
        if (updatedItem) {
          res.json(updatedItem);
        } else {
          res.status(404).json({ message: 'Item not found' });
        }
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    };
  
    /**
     * @desc    Delete item
     * @route   DELETE /api/:resource/:id
     */
    delete = async (req, res) => {
      try {
        await this.model.delete(req.params.id);
        res.json({ message: 'Item removed' });
      } catch (error) {
        res.status(404).json({ message: 'Item not found' });
      }
    };
  }
  
  export default BaseController;