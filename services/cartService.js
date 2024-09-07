const cartDao = require('../dao/cartDao');
const Cart = require('../models/cartModel');

// Create a new cart
const createCartService = async (cartData) => {
    try {
        console.log('Creating cart with data:', cartData); // Log data before saving
        return await cartDao.createCartDao(cartData);
    } catch (error) {
        console.error('Error creating cart in service:', error);
        throw new Error('Internal Server Error');
    }
};

// Get all carts
const getAllCartsService = async () => {
    try {
        return await cartDao.getAllCartsDao();
    } catch (error) {
        console.error('Error retrieving carts in service:', error);
        throw new Error('Internal Server Error');
    }
};

const ClearCartService = async (id) => {
    try {
        return await cartDao.ClearCart(id);
    } catch (error) {
       
        console.error('Error retrieving carts in service:', error);
        throw new Error('Internal Server Error');
    }
};
// Get a cart by ID
const getCartService = async (cartId) => {
    try {
        return await cartDao.getCartByIdDao(cartId);
    } catch (error) {
        console.error(`Error retrieving cart with ID ${cartId} in service:`, error);
        throw new Error('Internal Server Error');
    }
};

const updateCartService = async (cartId, updateData) => {
    try {
        // Validate cart ID
        if (!cartId) {
            throw new Error('Cart ID is required');
        }

        // Validate update data
        if (typeof updateData !== 'object' || !updateData) {
            throw new Error('Update data must be a valid object');
        }

        // Fetch the existing cart
        const cart = await Cart.findById(cartId);
        if (!cart) {
            console.warn(`Cart with ID ${cartId} not found`);
            return null; // Early exit if cart not found
        }

        // Handle product updates or additions
        if (Array.isArray(updateData.products)) {
            updateData.products.forEach(product => {
                // Check if product is valid
                if (!product || !product.product_id) {
                    console.warn('Invalid product data:', product);
                    return; // Skip this product
                }

                // Safely access product IDs
                const productId = product.product_id.toString();
                
                // Check if the product exists in the cart
                const existingProductIndex = cart.products.findIndex(p => 
                    p.product_id && p.product_id.toString() === productId
                );

                if (product.remove) {
                    // Remove product from the cart
                    cart.products = cart.products.filter(p => p.product_id && p.product_id.toString() !== productId);
                } else if (existingProductIndex > -1) {
                    // Update the existing product's order quantity
                    cart.products[existingProductIndex].orderQuantity = product.orderQuantity;
                } else {
                    // Add new product to the cart
                    cart.products.push({
                        product_id: productId,
                        productName: product.productName || '', // Provide defaults if necessary
                        orderQuantity: product.orderQuantity || 1, // Default order quantity
                        itemPrice: product.itemPrice || 0 // Default item price
                    });
                }
            });
        }

        // Prepare the update fields
        const updateFields = {
            products: cart.products,
            ...(updateData.payment && { payment: updateData.payment }) // Update payment if provided
        };

        // Update the cart using the DAO function
        const updatedCart = await cartDao.updateCartDao(cartId, updateFields);

        if (!updatedCart) {
            console.warn(`Failed to update cart with ID ${cartId}`);
            return null; // Early exit if cart update failed
        }

        console.log(`Cart with ID ${cartId} updated successfully`);
        return updatedCart;

    } catch (error) {
        console.error('Error updating cart service:', error);
        throw new Error('Internal Server Error: ' + error.message);
    }
};


// Delete a cart
const deleteCartService = async (cartId) => {
    try {
        return await cartDao.deleteCartDao(cartId);
    } catch (error) {
        console.error(`Error deleting cart with ID ${cartId} in service:`, error);
        throw new Error('Internal Server Error');
    }
};

module.exports = {
    createCartService,
    getAllCartsService,
    getCartService,
    updateCartService,
    deleteCartService,
    ClearCartService
};
