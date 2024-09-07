// middlewares/validateLogin.js
const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid or missing email' });
    }

    // Validate password
    if (!password || typeof password !== 'string' || password.trim().length === 0) {
        return res.status(400).json({ message: 'Invalid or missing password' });
    }

    // If validations pass, proceed to the next middleware or route handler
    next();
};

module.exports = validateLogin;

