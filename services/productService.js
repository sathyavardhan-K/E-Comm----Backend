const productDao = require('../dao/productDao');
const Category = require('../models/categoryModel');

// Create a new product
const createProductService = async (req, res) => {
    try {
        const { productCategory, ...productInput } = req.body;

        console.log('Requested category:', productCategory); // Log requested category
        console.log("Product Input: ", productInput);

        const category = await Category.findOne({ categoryName: productCategory });
        console.log("Fetch the category model", category);

        if (!category) {
            console.log('Category not found:', productCategory); // Log if category is not found
            return res.status(400).json({ message: 'Invalid category' });
        }

        productInput.productCategory = category._id;

        const newProduct = await productDao.createProductDao(productInput);

        return res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error in createProductService:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get products, optionally filtered by category
// Get products, optionally filtered by category and name
const getProductsService = async (req, res) => {
    try {
        const { category, name } = req.query;  // Extract category and name from the query parameters

        let products;

        if (category) {
            // If a category is provided, retrieve products that match the category
            if (name) {
                // If both category and name are provided, filter by both
                products = await productDao.getProductsByCategoryAndNameDao(category, name);
            } else {
                // Only filter by category
                products = await productDao.getProductsByCategoryDao(category);
            }
        } else if (name) {
            // If only name is provided, filter by name
            products = await productDao.getProductsByNameDao(name);
        } else {
            // Otherwise, retrieve all products
            products = await productDao.getProductsDao();
        }

        return res.status(200).json(products);
    } catch (err) {
        console.error('Error in getProductsService:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Get a product by ID
const getProductByIdService = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productDao.getProductByIdDao(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(product);
    } catch (err) {
        console.error('Error in getProductByIdService:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update a product by ID
const updateProductByIdService = async (req, res) => {
    try {
        const productId = req.params.id;
        const productUpdates = req.body;

        if (typeof productUpdates.productCategory === 'string') {
            const category = await Category.findOne({ categoryName: productUpdates.productCategory });
            console.log(category);

            if (!category) {
                return res.status(400).json({ message: 'Invalid category' });
            }
            productUpdates.productCategory = category._id;
        }

        const updatedProduct = await productDao.updateProductByIdDao(productId, productUpdates);

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json(updatedProduct);
    } catch (err) {
        console.error('Error in updateProductByIdService:', err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

// Delete a product by ID
const deleteProductByIdService = async (req, res) => {
    try {
        const productId = req.params.id; // Make sure this is correctly named

        const deletedProduct = await productDao.deleteProductByIdDao(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(204).send(); // No content on successful deletion
    } catch (err) {
        console.error('Error in deleteProductByIdService:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createProductService,
    getProductsService,
    getProductByIdService,
    updateProductByIdService,
    deleteProductByIdService
};
