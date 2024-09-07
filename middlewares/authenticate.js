const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

const authenticate = async (req, res, next) => {
    try {
     
        const token = req.cookies.authToken;
        console.log("Auth token",token);
        

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        const decoded = jwt.verify(token, secretKey);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        // if (user.userType !== 'admin') {
        //     return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
        // }

        req.user = user;
        next();
    } catch (err) {
        console.error("Authentication error:", err);
        
        return res.status(401).json({ message: 'Unauthorized: ' + err.message });
    }
};

module.exports = authenticate;
