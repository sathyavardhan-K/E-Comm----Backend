// models/productModel.js
const mongoose = require('mongoose');
const Category = require('./categoryModel'); // Import the Category model if needed

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    productImg: {
        type: String
    },
    refProductImgs: [{
        type: String // Store file paths or URLs for additional images
    }],
    productCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Category model
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    brandName: {
        type: String,
        required: true
    },
    availableStockQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    colors: [{
        type: String
    }],
    sellerName: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
