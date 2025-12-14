import mongoose from 'mongoose';
import BaseModel from './BaseModel.js';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String }, // URL for category thumbnail
}, {
  timestamps: true
});

const MongooseCategory = mongoose.model('Category', categorySchema);

class CategoryModel extends BaseModel {
  constructor() {
    super(MongooseCategory);
  }
}

export default new CategoryModel();