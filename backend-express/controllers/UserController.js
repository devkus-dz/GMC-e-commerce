import User from '../models/User.js';
import BaseController from './BaseController.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class UserController extends BaseController {
  constructor() {
    super(User);
  }

  // --- Auth Methods (Specific to Users) ---

  /**
   * @desc    Auth user & get token
   * @route   POST /api/users/login
   */
  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.model.findByEmail(email);

      if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: this.generateToken(user._id),
        });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  /**
   * @desc    Register a new user
   * @route   POST /api/users/register
   */
  registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const userExists = await this.model.findByEmail(email);

      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await this.model.create({
        name,
        email,
        password: hashedPassword,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: this.generateToken(user._id),
        });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  // --- Profile Methods ---

  /**
   * @desc    Get user profile
   * @route   GET /api/users/profile
   */
  getUserProfile = async (req, res) => {
    // We can reuse getById logic, but we need to pass req.user._id manually
    // or just fetch explicitly like this:
    try {
      const user = await this.model.findById(req.user._id);
      if (user) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          addresses: user.addresses
        });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(404).json({ message: 'User not found' });
    }
  };

  /**
   * @desc    Update user profile
   * @route   PUT /api/users/profile
   */
  updateUserProfile = async (req, res) => {
    try {
      const user = await this.model.findById(req.user._id);

      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(req.body.password, salt);
        }
        
        // We use save() because we modified the document directly
        const updatedUser = await user.save();

        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
          token: this.generateToken(updatedUser._id),
        });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  // Helper method for tokens
  generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  }

  // INHERITED METHODS AVAILABLE FOR ADMIN:
  // - getAll (List all users)
  // - delete (Delete a user by ID)
  // - getById (Get specific user details)
}

export default new UserController();