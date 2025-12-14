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
    getAll = async (req, res) => {
      try {
        // Pass req.query to handle simple filtering if your Model supports it
        const items = await this.model.findAll(req.query); 
        res.json(items);
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