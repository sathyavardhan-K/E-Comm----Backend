const validateUser = (req, res, next) => {
    const { username, email, password, phno, userType } = req.body;

    if (!username || typeof username !== 'string' || username.trim().length === 0) {
        return res.status(400).json({ message: 'Invalid or missing username' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid or missing email' });
    }

    if (!password || typeof password !== 'string' || password.trim().length === 0) {
        return res.status(400).json({ message: 'Invalid or missing password' });
    }

    const phoneRegex = /^\d{10}$/;
    if (!phno || !phoneRegex.test(phno)) {
        return res.status(400).json({ message: 'Invalid or missing phone number' });
    }

    const validUserTypes = ['customer', 'admin'];
    if (userType && !validUserTypes.includes(userType)) {
        return res.status(400).json({ message: 'Invalid user type' });
    }

    // If all validations pass, proceed to the next middleware or route handler
    next();
};

module.exports = validateUser;
