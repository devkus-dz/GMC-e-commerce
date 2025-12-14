import Order from '../models/Order.js';
import BaseController from './BaseController.js';

class OrderController extends BaseController {
  constructor() {
    super(Order);
  }

  /**
   * @desc    Create new order
   * @override BaseController.create
   */
  create = async (req, res) => {
    try {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      if (orderItems && orderItems.length === 0) {
        return res.status(400).json({ message: 'No order items' });
      }

      const order = await this.model.create({
        user: req.user.id, // Comes from AuthMiddleware
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  /**
   * @desc    Get order by ID
   * @override BaseController.getById
   */
  getById = async (req, res) => {
    try {
      // Use the specific 'findByIdPopulated' from Order
      const order = await this.model.findByIdPopulated(req.params.id);
      
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      // Ensure only Admin or the Order Owner can view it
      if (req.user.isAdmin || order.user._id.toString() === req.user._id.toString()) {
          res.json(order);
      } else {
          res.status(401).json({ message: 'Not authorized to view this order' });
      }

    } catch (error) {
      res.status(404).json({ message: 'Order not found' });
    }
  };

  /**
   * @desc    Update order to paid
   * @route   PUT /api/orders/:id/pay
   */
  updateOrderToPaid = async (req, res) => {
    try {
      const order = await this.model.findById(req.params.id);

      if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.payer?.email_address,
        };

        // We use .save() directly on the mongoose document
        const updatedOrder = await order.save();
        res.json(updatedOrder);
      } else {
        res.status(404).json({ message: 'Order not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  /**
   * @desc    Get logged in user orders
   * @route   GET /api/orders/myorders
   */
  getMyOrders = async (req, res) => {
    try {
      const orders = await this.model.findByUser(req.user.id);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default new OrderController();