const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');

// const authenticate = require('../middlewares/authenticate');
// const authorize = require('../middlewares/authorize');


// Route to create an order
router.post('/orders', orderService.createOrder);

// Route to update an order
router.put('/orders/:id', orderService.updateOrder);

// Route to get all orders (if needed)
router.get('/orders', orderService.getAllOrders);

// Route to get a specific order by ID
router.get('/orders/:id', orderService.getOrderById);

// Route to delete an order (if needed)
router.delete('/orders/:id', orderService.deleteOrder);

// Route to get orders by user ID using query parameters
router.get('/orders/user/:id', orderService.getOrdersByUserId);

module.exports = router;
