import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import categories from './data/categories.js';
import reviewTemplates from './data/reviews.js'; // Import review templates
import orderTemplates from './data/orders.js';   // Import order templates

import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import Category from './models/Category.js';
import Review from './models/Review.js'; // Ensure you have this model

import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // 1. CLEAR ALL DATA
    await Order.model.deleteMany();
    await Product.model.deleteMany();
    await User.model.deleteMany();
    await Category.model.deleteMany();
    await Review.model.deleteMany();

    console.log('--- Data Cleared ---');

    const usersWithHashedPasswords = users.map((user) => {
      // Synchronously hash the password (salt 10 is standard)
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);
      return { ...user, password: hash };
    });

    // 2. CREATE USERS
    const createdUsers = await User.model.create(usersWithHashedPasswords);
    const adminUser = createdUsers[0]._id; // Admin is first in users.js
    const customerUser = createdUsers[1]._id; // Customer is second

    // 3. CREATE CATEGORIES
    const createdCategories = await Category.model.insertMany(categories);

    // 4. PREPARE PRODUCTS (Link to Admin & Category)
    const sampleProducts = products.map((product) => {
      const matchingCategory = createdCategories.find(
        (cat) => cat.name === product.category
      );

      if (!matchingCategory) {
        console.error(`Category '${product.category}' not found`.red);
        process.exit(1);
      }

      return {
        ...product,
        user: adminUser,
        category: matchingCategory._id,
      };
    });

    // 5. INSERT PRODUCTS
    const createdProducts = await Product.model.insertMany(sampleProducts);

    // 6. CREATE REVIEWS
    // We will add reviews to the first product in the list
    const productToReview = createdProducts[0];
    
    const sampleReviews = reviewTemplates.map((review) => {
      return {
        ...review,
        user: customerUser,      // Reviewer is the Customer
        product: productToReview._id,
        name: createdUsers[1].name // Customer Name
      };
    });

    await Review.model.insertMany(sampleReviews);
    
    // Update the product's rating stats
    productToReview.numReviews = sampleReviews.length;
    productToReview.rating = sampleReviews.reduce((acc, item) => item.rating + acc, 0) / sampleReviews.length;
    await productToReview.save();

    // 7. CREATE ORDERS
    // Create an order for the Customer containing the 2nd product
    const productOrdered = createdProducts[1];
    
    const sampleOrderItems = [
      {
        name: productOrdered.name,
        qty: 1,
        image: productOrdered.image,
        price: productOrdered.price,
        product: productOrdered._id,
      }
    ];

    const sampleOrders = orderTemplates.map((order) => {
      return {
        ...order,
        user: customerUser,
        orderItems: sampleOrderItems,
        itemsPrice: productOrdered.price,
        totalPrice: productOrdered.price + order.shippingPrice
      };
    });

    await Order.model.insertMany(sampleOrders);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.model.deleteMany();
    await Product.model.deleteMany();
    await User.model.deleteMany();
    await Category.model.deleteMany();
    await Review.model.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}