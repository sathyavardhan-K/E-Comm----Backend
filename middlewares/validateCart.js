const validateCartData = (req, res, next) => {
    const { created_by, products, payment } = req.body;

    if (!created_by || !products || !payment) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!Array.isArray(products)) {
        return res.status(400).json({ message: 'Products must be an array' });
    }

    next();
};

module.exports = {
    validateCartData
};
