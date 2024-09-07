
const categoryDao = require('../dao/categoryDao');
const Category = require('../models/categoryModel'); // Import the Category model

const createCategoryService = async (req, res) => {
    try {
        const categoryInput = req.body;

        // const category = await Category.find();
        // console.log(category);
    
        const newCategory = await categoryDao.createCategoryDao(categoryInput);

        return res.status(201).json(newCategory);
    } catch (err) {
        console.error('Error in createCategoryService:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


const getCategoriesService = async (req, res) => {
    try {
    
        const categories = await categoryDao.getCategoriesDao();

        // Respond with the list of products and a 200 status code
        return res.status(200).json(categories);
    } catch (err) {
        console.error('Error in getCategoriesService:', err);
        // Respond with a 500 status code in case of an error
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getCategoryByIdService = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await categoryDao.getCategoryByIdDao(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(200).json(category);
    } catch (err) {
        console.error('Error in getCategoryByIdService:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
const updateCategoryByIdService = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const categoryUpdates = req.body;

        const updatedCategory = await categoryDao.updateCategoryByIdDao(categoryId, categoryUpdates);

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(200).json(updatedCategory);
    } catch (err) {
        console.error('Error in updateCategoryByIdDao:', err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

const deleteCategoryByIdService = async (req, res) => {
    try {
        const categoryId = req.params.id; // Make sure this is correctly named

        const deletedCategory = await categoryDao.deleteCategoryByIdDao(categoryId);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(204).send(); // No content on successful deletion
    } catch (err) {
        console.error('Error in deleteCategoryByIdDao:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createCategoryService,
    getCategoriesService,
    getCategoryByIdService,
    updateCategoryByIdService,
    deleteCategoryByIdService
};
