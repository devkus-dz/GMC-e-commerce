import mongoose from 'mongoose';
import BaseModel from './BaseModel.js';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true, default: 0 },
  image: { type: String },
  brand: {type: String},
  
  variations: [
    {
      color: { type: String },
      size: { type: String },
      countInStock: { type: Number },
      price: { type: Number }
    }
  ],
  
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 }
}, {
  timestamps: true
});

const MongooseProduct = mongoose.model('Product', productSchema);

class ProductModel extends BaseModel {
  constructor() {
    super(MongooseProduct);
  }

  // Add the specific methods we used in the controller earlier
  async findAll(keyword = {}) {
     return await this.model.find({ ...keyword });
  }
}

export default new ProductModel();