const userDao = require('../dao/userDao');
const mongoose = require('mongoose');

const createUserService = async (req, res) => {
    try {
        const { username, email, password, phno, userType, shippingAddress, billingAddress, city, state, pincode } = req.body;

        // Validate input data
        if (!email || !password || !username) {
            return res.status(400).json({ message: 'Email, password, and username are required.' });
        }

        // Create user in the database without hashing the password
        const newUser = await userDao.createUserDao({
            username,
            email,
            password, // Directly use the plain password as received
            phno,
            userType,
            shippingAddress,
            billingAddress,
            city,
            state,
            pincode
        });

        return res.status(201).json(newUser);
    } catch (err) {
        console.error('Error in createUserService:', err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllUsersService = async (req, res) => {
    try {
        const users = await userDao.getUserDao();
        return res.status(200).json(users);
    } catch (err) {
        console.error('Error in getAllUsersService:', err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getUserByIdService = async (req, res) => {
    try {
        const userId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: 'Invalid User ID' });
        }

        const user = await userDao.getUserByIdDao(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (err) {
        console.error('Error in getUserByIdService:', err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateUserByIdService = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        // Directly update the user data without hashing the password
        const updatedUser = await userDao.updateUserByIdDao(userId, updateData);

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(updatedUser);
    } catch (err) {
        console.error('Error in updateUserByIdService:', err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteUserByIdService = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await userDao.deleteUserByIdDao(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(204).send(); // No content response on successful deletion
    } catch (err) {
        console.error('Error in deleteUserByIdService:', err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createUserService,
    getAllUsersService,
    getUserByIdService,
    updateUserByIdService,
    deleteUserByIdService
};
