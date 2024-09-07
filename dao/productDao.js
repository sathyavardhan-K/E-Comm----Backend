const mongoose = require('mongoose');
const Product = require('../models/productModel');

const createProductDao = async (productData) => {
    try {
        const product = new Product(productData);
        return await product.save();
    } catch (err) {
        throw new Error('Error creating product: ' + err.message);
    }
};

const getProductsDao = async () => {
    try {
        return await Product.find().populate('productCategory'); // Populate category info if needed
    } catch (err) {
        throw new Error('Error retrieving products: ' + err.message);
    }
};

const getProductByIdDao = async (productId) => {
    try {
        return await Product.findById(productId).populate('productCategory');
    } catch (err) {
        throw new Error('Error retrieving product by ID: ' + err.message);
    }
};

const updateProductByIdDao = async (productId, updateData) => {
    try {
        if (updateData.sku) {
            const existingProduct = await Product.findOne({ sku: updateData.sku });
            if (existingProduct && existingProduct._id.toString() !== productId) {
                throw new Error('Duplicate SKU value detected');
            }
        }

        // Perform the update
        return await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true, runValidators: true }
        ).populate('productCategory');
    } catch (err) {
        console.error('Error in updateProductByIdDao:', err.message);
        throw new Error('Error updating product by ID: ' + err.message);
    }
};

const deleteProductByIdDao = async (productId) => {
    try {
        // Ensure the productId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            throw new Error('Invalid Product ID');
        }
        // Find the product and delete it
        return await Product.findByIdAndDelete(productId);
    } catch (err) {
        throw new Error('Error deleting product by ID: ' + err.message);
    }
};

// New DAO function to get products by category
const getProductsByCategoryDao = async (categoryId) => {
    try {
        // Fetch products that match the provided categoryId
        return await Product.find({ productCategory: categoryId });
    } catch (err) {
        console.error('Error in getProductsByCategoryDao:', err);
        throw err;
    }
};

module.exports = {
    createProductDao,
    getProductsDao,
    getProductByIdDao,
    updateProductByIdDao,
    deleteProductByIdDao,
    getProductsByCategoryDao
};
