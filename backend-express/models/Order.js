import mongoose from 'mongoose';
import BaseModel from './BaseModel.js';

const orderSchema = new mongoose.Schema(
  {
    // Link to the user who placed the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    // Array of items purchased (Snapshot of data)
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String},
        price: { type: Number, required: true }, // Price at time of purchase
        
        // Product Reference
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },

        // Variation details (Color, Size, etc.)
        selectedColor: { type: String },
        selectedSize: { type: String },
      },
    ],

    // Shipping Details
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },

    // Payment Info
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: { // Data returned from PayPal/Stripe
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },

    // Prices
    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },

    // Status Flags
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create the Mongoose Model
const MongooseOrder = mongoose.model('Order', orderSchema);

// Create the Class extending BaseModel
class OrderModel extends BaseModel {
  constructor() {
    super(MongooseOrder);
  }

  /**
   * Find all orders for a specific user
   * @param {string} userId 
   */
  async findByUser(userId) {
    return await this.model.find({ user: userId }).sort({ createdAt: -1 });
  }

  /**
   * Find order by ID and populate user name/email
   * Useful for the Admin dashboard or Order Details page
   * @param {string} id 
   */
  async findByIdPopulated(id) {
    return await this.model.findById(id).populate('user', 'name email');
  }

  /**
   * Find ALL orders and populate user details (For Admin Dashboard)
   */
  async findAllPopulated() {
    // We access the raw mongoose model via 'this.model' inherited from BaseModel
    return await this.model.find({}).populate('user', 'id name');
  }
}

export default new OrderModel();