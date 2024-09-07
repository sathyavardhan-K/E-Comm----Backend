// dao/orderDao.js
const Order = require('../models/orderModel');
const mongoose = require('mongoose');

const createOrderDao = async (orderData) => {
    const newOrder = new Order(orderData);
    return await newOrder.save();
};

const getAllOrdersDao = async () => {
    return await Order.find().populate('user_id').populate('cart_id');
};

const getOrderByIdDao = async (orderId) => {
    return await Order.findById(orderId).populate('user_id').populate('cart_id');
};



const getOrdersByUserIdDao = async (userId) => {
    try {
        // Convert userId to ObjectId using new
        const objectId = new mongoose.Types.ObjectId(userId);
        return await Order.find({ user_id: objectId })
            .populate('user_id')
            .populate('cart_id');
    } catch (err) {
        console.error('Error fetching orders by user ID from DAO:', err);
        throw err;
    }
};



const updateOrderDao = async (orderId, updateData) => {
    return await Order.findByIdAndUpdate(orderId, updateData, { new: true });
};

const deleteOrderDao = async (orderId) => {
    return await Order.findByIdAndDelete(orderId);
};

module.exports = {
    createOrderDao,
    getAllOrdersDao,
    getOrdersByUserIdDao,
    getOrderByIdDao,
    updateOrderDao,
    deleteOrderDao
};
