import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load .env file from the root directory
dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB;

    if (!uri) {
      throw new Error('MONGODB_URI is not defined in the .env file');
    }

    const conn = await mongoose.connect(uri, {
      dbName: dbName, // Uses the specific database name variable
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;