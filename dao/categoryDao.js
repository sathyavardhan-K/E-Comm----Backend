const mongoose = require('mongoose');
const Category = require('../models/categoryModel');

const createCategoryDao = async (categoryData) => {
    try {
        const category = new Category(categoryData);
        return await category.save();
    } catch (err) {
        throw new Error('Error creating category: ' + err.message);
    }
};

const getCategoriesDao = async () => {
    try {
        return await Category.find();
    } catch (err) {
        throw new Error('Error retrieving categories: ' + err.message);
    }
};

const getCategoryByIdDao = async (categoryId) => {
    try {
        return await Category.findById(categoryId);
    } catch (err) {
        throw new Error('Error retrieving category by ID: ' + err.message);
    }
};

const updateCategoryByIdDao = async (categoryId, updateData) => {
    try {

        return await Category.findByIdAndUpdate(categoryId, updateData, { new: true, runValidators: true });
    } catch (err) {
        console.error('Error in updateCategoryByIdDao:', err.message);
        throw new Error('Error updating category by ID: ' + err.message);
    }
};


const deleteCategoryByIdDao = async (categoryId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            throw new Error('Invalid Category ID');
        }

        return await Category.findByIdAndDelete(categoryId);
    } catch (err) {
        throw new Error('Error deleting category by ID: ' + err.message);
    }
};

module.exports = {
    createCategoryDao,
    getCategoriesDao,
    getCategoryByIdDao,
    updateCategoryByIdDao,
    deleteCategoryByIdDao
};
