import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'; 

// 1. Import Routes at the top using ES6 syntax
// Note: You must add the .js extension in imports!
import UserRoutes from './routes/UserRoutes.js';
import ProductRoutes from './routes/ProductRoutes.js';
import OrderRoutes from './routes/OrderRoutes.js';
import CategoryRoutes from './routes/CategoryRoutes.js'; // If you haven't added it yet
import ReviewRoutes from './routes/ReviewRoutes.js'

// Load env vars
dotenv.config();

// 2. Connect to Database (Use your helper function)
connectDB(); 

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// 3. Use Routes
app.use('/api/users', UserRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/categories', CategoryRoutes);
app.use('/api/orders', OrderRoutes);
app.use('/api/reviews', ReviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));