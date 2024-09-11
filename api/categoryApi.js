// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const categoryService = require('../services/categoryService');
const validateCategory = require('../middlewares/validateCategory');


// const authenticate = require('../middlewares/authenticate');
// const authorize = require('../middlewares/authorize');

// Route to create a new product
router.post('/category', validateCategory, categoryService.createCategoryService);

// Route to get all category
router.get('/category', categoryService.getCategoriesService);

// Route to get a product by ID
router.get('/category/:id', categoryService.getCategoryByIdService);
 
// Route to update a product by ID
router.put('/category/:id', validateCategory, categoryService.updateCategoryByIdService);

// Route to delete a product by ID
router.delete('/category/:id', categoryService.deleteCategoryByIdService);

module.exports = router;
