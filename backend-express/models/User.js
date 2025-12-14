import mongoose from 'mongoose';
import BaseModel from './BaseModel.js'; // Don't forget the .js extension

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
  // Improvement: Define structure for addresses instead of a generic Array
  addresses: [{
    street: String,
    city: String,
    zipCode: String,
    country: String
  }],
  
  isActive: { type: Boolean, default: true },
  isAdmin: { type: Boolean, default: false }, // 'admin' or 'customer' logic is handled here
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

const MongooseUser = mongoose.model('User', userSchema);

class User extends BaseModel {
  constructor() {
    super(MongooseUser);
  }

  // Specific method for authentication
  async findByEmail(email) {
    return await this.model.findOne({ email });
  }
}

export default new User();