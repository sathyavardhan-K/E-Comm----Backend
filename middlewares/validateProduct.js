
const validateProduct = (req, res, next) => {
    const { productName, description, price, productImg, refProductImgs, productCategory, sku, brandName, availableStockQuantity, colors, offer, sellerName } = req.body;

    if (!productName || typeof productName !== 'string' || productName.trim().length === 0) {
        return res.status(400).json({ message: 'Invalid or missing product name' });
    }

    if (!description || typeof description !== 'string' || description.trim().length === 0) {
        return res.status(400).json({ message: 'Invalid or missing description' });
    }

    if (!price || typeof price !== 'string' || !/^\d+(\.\d{1,2})?$/.test(price)) {
        return res.status(400).json({ message: 'Invalid or missing price' });
    }

    if (!productImg || typeof productImg !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing product image' });
    }

    if (!Array.isArray(refProductImgs) || !refProductImgs.every(img => typeof img === 'string')) {
        return res.status(400).json({ message: 'Invalid or missing reference product images' });
    }

    if (!productCategory) {
        return res.status(400).json({ message: 'Invalid or missing product category' });
    }

    if (!sku || typeof sku !== 'string') {
        return res.status(400).json({ message: 'Invalid or missing SKU' });
    }

    if (!brandName || typeof brandName !== 'string' || brandName.trim().length === 0) {
        return res.status(400).json({ message: 'Invalid or missing brand name' });
    }

    if (typeof availableStockQuantity !== 'number' || availableStockQuantity < 0) {
        return res.status(400).json({ message: 'Invalid or missing available stock quantity' });
    }

    // if (!Array.isArray(colors) || !colors.every(color => typeof color === 'string')) {
    //     return res.status(400).json({ message: 'Invalid or missing colors' });
    // }

    if (!sellerName || typeof sellerName !== 'string' || sellerName.trim().length === 0) {
        return res.status(400).json({ message: 'Invalid or missing seller name' });
    }

    next();
};

module.exports = validateProduct;
