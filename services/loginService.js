const jwt = require('jsonwebtoken');
const userDao = require('../dao/userDao');
const secretKey = process.env.JWT_SECRET || 'yourSecretKey';

const loginUserService = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Fetch user by email
        const user = await userDao.getUserByEmailDao(email);
        console.log('Fetched user:', user); // Log the fetched user details for debugging

        if (!user) {
            console.log('User not found with email:', email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Direct comparison of plain text passwords
        console.log('Password from request:', password);
        console.log('Password from database:', user.password);

        if (user.password !== password) {
            console.log('Password mismatch for user:', email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user._id, userType: user.userType }, secretKey, { expiresIn: '1h' });

        // Set JWT in a cookie
        res.cookie('authToken', token, { httpOnly: true, secure: false }); // Use `secure: true` for HTTPS only
        res.cookie('userType', user.userType, { httpOnly: true, secure: false });

        // Return success response with the token and user details
        return res.status(200).json({ message: 'Login successful', token, _id: user._id, userType: user.userType });

    } catch (err) {
        console.error('Error in loginUserService:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { loginUserService };
