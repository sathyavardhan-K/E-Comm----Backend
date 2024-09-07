const mongoose = require('mongoose');
const Product = require('./productModel'); // Import the Product model
const User = require('./userModel'); // Import the User model

const cartSchema = new mongoose.Schema({
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    products: [
        
        {
            product_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product' // Reference to the Product model
                
            },
            productName: {
                type: String
                // This should match the product name from the Product model
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
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
