
const validateCategory = (req, res, next) => {
    const { categoryName, categoryImage} = req.body;

    if (!categoryName || typeof categoryName !== 'string' || categoryName.trim().length === 0) {
        return res.status(400).json({ message: 'Invalid or missing category name' });
    }

    if (!categoryImage || typeof categoryImage !== 'string' || categoryImage.trim().length === 0) {
        return res.status(400).json({ message: 'Invalid or missing image' });
    }

    next();
};

module.exports = validateCategory;
