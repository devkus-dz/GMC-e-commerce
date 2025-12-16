// backend/models/BaseModel.js

class BaseModel {
    /**
     * @param {Model} mongooseModel - The Mongoose Model (e.g., User, Product)
     */
    constructor(mongooseModel) {
      this.model = mongooseModel;
    }
  
    // Create a new document
    async create(data) {
      try {
        const document = await this.model.create(data);
        return document;
      } catch (error) {
        throw new Error(`Error creating document: ${error.message}`);
      }
    }
  
    // Find all documents (with optional filtering)
    async findAll(filter = {}) {
      try {
        return await this.model.find(filter);
      } catch (error) {
        throw new Error(`Error finding documents: ${error.message}`);
      }
    }
  
    // Find a single document by ID
    async findById(id) {
      try {
        const document = await this.model.findById(id);
        if (!document) throw new Error('Document not found');
        return document;
      } catch (error) {
        throw error;
      }
    }
  
    // Update a document by ID
    async update(id, data) {
      try {
        const document = await this.model.findByIdAndUpdate(id, data, {
          new: true, // Return the updated document
          runValidators: true // Ensure data matches schema rules
        });
        if (!document) throw new Error('Document not found for update');
        return document;
      } catch (error) {
        throw error;
      }
    }
  
    // Delete a document by ID
    async delete(id) {
      try {
        const document = await this.model.findByIdAndDelete(id);
        if (!document) throw new Error('Document not found for deletion');
        return { message: 'Document deleted successfully', id };
      } catch (error) {
        throw error;
      }
    }

    /**
   * @desc    Get paginated results
   * @param   {Object} query - MongoDB query filter (e.g. { name: "iPhone" })
   * @param   {Number} page - Current page number (default 1)
   * @param   {Number} limit - Items per page (default 10)
   */
    async findPaginated(query = {}, page = 1, limit = 10) {
      // 1. Count total documents matching the query (for calculating total pages)
      const count = await this.model.countDocuments({ ...query });

      // 2. Calculate how many items to skip
      // Example: Page 1 skips 0. Page 2 skips 10.
      const skip = (page - 1) * limit;

      // 3. Fetch the actual data
      const items = await this.model.find({ ...query })
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: -1 }); // Sort by newest first

      // 4. Return standard pagination object
      return {
        items,
        page,
        pages: Math.ceil(count / limit),
        count
      };
    }
  }
  
  export default BaseModel;