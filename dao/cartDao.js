const Cart = require('../models/cartModel');
const Product = require('../models/productModel'); // Ensure the path is correct

// Create a new cart
const createCartDao = async (cartData) => {
    try {
        const cart = new Cart(cartData);
        const newCart = await cart.save();
        console.log('Created Cart:', newCart);
        return newCart;
    } catch (error) {
        console.error('Error creating cart:', error);
        throw new Error('Could not create cart');
    }
};

const ClearCart = async (cartId) => {
    try {
        
        const cartData = await Cart.findById(cartId);
        if (!cartData) {
            throw new Error('Cart not found');
        }
        cartData.payment = {};
        cartData.products = [];
        await cartData.save();
        return 1 
    } catch (error) {
        console.error('Error clearing cart:', error.message);
    }
};


// Get all carts
const getAllCartsDao = async () => {
    try {
        const carts = await Cart.find();
        return carts;
    } catch (error) {
        console.error('Error retrieving carts:', error);
        throw new Error('Could not retrieve carts');
    }
};

// Get cart by ID
const getCartByIdDao = async (cartId) => {
    try {
        const cart = await Cart.findById(cartId);
        return cart;
    } catch (error) {
        console.error(`Error retrieving cart with ID ${cartId}:`, error);
        throw new Error('Could not retrieve cart');
    }
};

// Update a cart
const updateCartDao = async (cartId, updateData) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(cartId, updateData, { new: true });
        if (!updatedCart) {
            console.warn(`Cart with ID ${cartId} not found for update`);
            return null;
        }
        return updatedCart;
    } catch (error) {
        console.error(`Error updating cart with ID ${cartId}:`, error);
        throw new Error('Could not update cart');
    }
};

// Delete a cart
const deleteCartDao = async (cartId) => {
    try {
        const deletedCart = await Cart.findByIdAndDelete(cartId);
        if (!deletedCart) {
            console.warn(`Cart with ID ${cartId} not found for deletion`);
            return null;
        }
        return deletedCart;
    } catch (error) {
        console.error(`Error deleting cart with ID ${cartId}:`, error);
        throw new Error('Could not delete cart');
    }
};

module.exports = {
    createCartDao,
    getAllCartsDao,
    getCartByIdDao,
    updateCartDao,
    deleteCartDao,
    ClearCart
};
