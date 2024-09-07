const express = require('express');
const router = express.Router();
const cartService = require('../services/cartService');
const { validateCartData } = require('../middlewares/validateCart');

// Route to create a new cart
router.post('/carts',validateCartData, async (req, res) => {
    console.log('Received cart data:', req.body); // Log incoming data
    try {
        const cartData = req.body;
        const newCart = await cartService.createCartService(cartData);
        res.status(201).json(newCart);
    } catch (error) {
        console.error('Error creating cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Route to get all carts
router.get('/carts',  async (req, res) => {
    try {
        const carts = await cartService.getAllCartsService();
        if (!carts || carts.length === 0) {
            return res.status(404).json({ message: 'No carts found' });
        }
        res.status(200).json(carts);
    } catch (error) {
        console.error('Error retrieving carts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/carts/clearCart/:id',  async (req, res) => {
    try {
        const cartId = req.params.id;
        const Clearedcart = await cartService.ClearCartService(cartId);
        if (Clearedcart) {
            return res.status(200).json({ message: 'Your Cart is Cleared' });
        }
    } catch (error) {       
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// Route to get a cart by ID
router.get('/carts/:id', async (req, res) => {
    try {
        const cartId = req.params.id;
        const cart = await cartService.getCartService(cartId);
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error retrieving cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route to update a cart
router.put('/carts/:id', async (req, res) => {  
    const cartId = req.params.id;
    const updateData = req.body;

    // Validate input
    if (!cartId || typeof cartId !== 'string') {
        return res.status(400).json({ message: 'Invalid cart ID' });
    }

    if (!updateData || typeof updateData !== 'object') {
        return res.status(400).json({ message: 'Invalid update data' });
    }

    try {
        // Perform the update operation
        const updatedCart = await cartService.updateCartService(cartId, updateData);
        
        if (!updatedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(updatedCart);
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// Route to delete a cart
router.delete('/carts/:id', async (req, res) => {
    try {
        const cartId = req.params.id;
        const deletedCart = await cartService.deleteCartService(cartId);
        if (!deletedCart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json({ message: 'Cart deleted successfully' });
    } catch (error) {
        console.error('Error deleting cart:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
