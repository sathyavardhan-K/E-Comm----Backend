const authorize = (allowedRoles) => {
    return (req, res, next) => {
        const userType = req.user.userType; // The user is set in the req object by the authenticate middleware

        if (allowedRoles.includes(userType)) {
            return next();
        }

        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    };
};

module.exports = authorize;
