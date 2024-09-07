// models/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    products: [
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            productName: {
                type: String
                // Ensure this matches the Product model
            },
            orderQuantity: {
                type: Number,
                min: 1
            },
            itemPrice: {
                type: mongoose.Schema.Types.Decimal128
            }
        }
    ],
    payment: {
        deliveryCharges: {
            type: mongoose.Schema.Types.Decimal128,
            default: 30
        },
        totalPrice: {
            type: mongoose.Schema.Types.Decimal128,
            default: 0.00
        }
    },

    paymentStatus: {
        type: String,
        enum: ['paid', 'unpaid', 'refunded'],
        default: 'unpaid'
    },
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    reachedDate: {
        type: Date,
        default: function() {
            const reachedDate = new Date(this.purchaseDate);
            reachedDate.setDate(reachedDate.getDate() + 2);
            return reachedDate;
        }
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
