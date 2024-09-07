// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productService = require('../services/productService');
const validateProduct = require('../middlewares/validateProduct');

// const authenticate = require('../middlewares/authenticate');
// const authorize = require('../middlewares/authorize');

// Route to create a new product
router.post('/products', productService.createProductService);

// Route to get all products - accessible to authenticated users
router.get('/products', productService.getProductsService);

// Route to get a product by ID - accessible to authenticated users
router.get('/products/:id', productService.getProductByIdService);

// Route to update a product by ID - accessible to admin only
router.put('/products/:id', productService.updateProductByIdService);

// Route to delete a product by ID - accessible to admin only
router.delete('/products/:id', productService.deleteProductByIdService);

module.exports = router;
