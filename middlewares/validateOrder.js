const mongoose = require('mongoose');

const validateOrder = (req, res, next) => {
    const { user_id, cart_id, paymentStatus, status, purchaseDate, reachedDate, products, payment } = req.body;

    // Validate user_id and cart_id are valid ObjectIds
    if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    if (!cart_id || !mongoose.Types.ObjectId.isValid(cart_id)) {
        return res.status(400).json({ message: 'Invalid cart ID' });
    }

    // Validate paymentStatus
    const validPaymentStatuses = ['paid', 'unpaid', 'refunded'];
    if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
        return res.status(400).json({ message: 'Invalid payment status' });
    }

    // Validate status
    const validStatuses = ['pending', 'shipped', 'delivered', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    // Validate purchaseDate and reachedDate
    if (purchaseDate && isNaN(Date.parse(purchaseDate))) {
        return res.status(400).json({ message: 'Invalid purchase date' });
    }
    if (reachedDate && isNaN(Date.parse(reachedDate))) {
        return res.status(400).json({ message: 'Invalid reached date' });
    }

    // Validate payment object
    if (payment) {
        const { deliveryCharges, totalPrice } = payment;

        // Validate deliveryCharges
        if (deliveryCharges && (typeof deliveryCharges !== 'number' || deliveryCharges < 0)) {
            return res.status(400).json({ message: 'Invalid delivery charges' });
        }

        // Validate totalPrice
        if (totalPrice && (typeof totalPrice !== 'number' || totalPrice < 0)) {
            return res.status(400).json({ message: 'Invalid total price' });
        }
    } else {
        return res.status(400).json({ message: 'Payment details are required' });
    }

    // Validate products array
    if (!Array.isArray(products)) {
        return res.status(400).json({ message: 'Products must be an array' });
    }

    for (const product of products) {
        const { product_id, productName, orderQuantity, itemPrice } = product;

        // Validate product_id
        if (!product_id || !mongoose.Types.ObjectId.isValid(product_id)) {
            return res.status(400).json({ message: 'Invalid product ID in products array' });
        }

        // Validate productName
        if (typeof productName !== 'string' || productName.trim() === '') {
            return res.status(400).json({ message: 'Invalid product name in products array' });
        }

        // Validate orderQuantity
        if (typeof orderQuantity !== 'number' || orderQuantity < 1) {
            return res.status(400).json({ message: 'Invalid order quantity in products array' });
        }

        // Validate itemPrice
        if (typeof itemPrice !== 'number' || itemPrice < 0) {
            return res.status(400).json({ message: 'Invalid item price in products array' });
        }
    }

    next();
};

module.exports = validateOrder;
