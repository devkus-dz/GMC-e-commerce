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
  }
  
  export default BaseModel;