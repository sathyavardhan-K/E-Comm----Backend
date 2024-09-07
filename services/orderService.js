// services/orderService.js
const orderDao = require('../dao/orderDao');
const mongoose = require('mongoose');

const createOrder = async (req, res) => {
    try {
        const newOrder = await orderDao.createOrderDao(req.body);
        return res.status(201).json(newOrder);
    } catch (err) {
        console.error('Error creating order:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderDao.getAllOrdersDao();
        return res.status(200).json(orders);
        // return orders;
        console.log("Get all orders", orders);
        
    } catch (err) {
        console.error('Error fetching orders:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await orderDao.getOrderByIdDao(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json(order);
    } catch (err) {
        console.error('Error fetching order:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.params.id; // Ensure this matches the route definition

        // Validate if userId is provided and is a valid ObjectId
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid or missing user ID' });
        }

        const orders = await orderDao.getOrdersByUserIdDao(userId);
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        return res.status(200).json(orders);
    } catch (err) {
        console.error('Error fetching orders by user ID:', err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};


const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await orderDao.updateOrderDao(req.params.id, req.body);
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        // Check if the status is 'paid'
        if (updatedOrder.paymentStatus === 'paid') {

            const date = new Date(updatedOrder.reachedDate);

            // Format to a readable string
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
            const formattedDate = date.toLocaleString('en-US', options);
            console.log(`Order ID: ${updatedOrder._id}, Reached Date: ${formattedDate}`);
            return res.status(200).json({
                message: 'Order updated successfully',
                reachedDate: formattedDate
            });
        } else {
            return res.status(200).json(updatedOrder);
        }
        
    } catch (err) {
        console.error('Error updating order:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await orderDao.deleteOrderDao(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        return res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
        console.error('Error deleting order:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    getOrdersByUserId,
    updateOrder,
    deleteOrder
};
