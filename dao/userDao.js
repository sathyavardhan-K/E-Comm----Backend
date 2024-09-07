const UserDetails = require('../models/userModel'); // Correct import
const mongoose = require('mongoose');

const createUserDao = async (data) => {
    console.log("Data",data);
    
    try {
        const newUser = new UserDetails({
            ...data
        });
        console.log("d2",newUser);
        const newData = await newUser.save();
        console.log("d3",newData);
        return newData; // Return the created user data
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Re-throw the error to be handled in the service layer
    }
};

const getUserDao = async () => {
    try {
        const users = await UserDetails.find(); // Correct query
        return users; // Return the list of users
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error; // Re-throw the error to be handled in the service layer
    }
};

const getUserByIdDao = async (userId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error('Invalid ObjectId');
        }
        const user = await UserDetails.findById(userId); // Finds a user by their ObjectId

        return user; // Returns the user document, or null if not found
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new Error('Error fetching user by ID: ' + error.message);
    }
};


// dao/userDao.js
const updateUserByIdDao = async (userId, updateData) => {
    try {
        const updatedUser = await UserDetails.findByIdAndUpdate(userId, updateData, { new: true });
        return updatedUser;
    } catch (error) {
        console.error('Error updating user by ID:', error);
        throw error;
    }
};

const deleteUserByIdDao = async (userId) => {
    try {
        const deletedUser = await UserDetails.findByIdAndDelete(userId);

        return deletedUser; // Returns the deleted user document, or null if not found
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Error deleting user: ' + error.message);
    }
};


const getUserByEmailDao = async (email) => {
    try {
        const user = await UserDetails.findOne({ email: email.toLowerCase() }).select('_id email password userType');
        return user;
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
};


module.exports = {
    createUserDao,
    getUserDao,
    getUserByIdDao,
    updateUserByIdDao,
    deleteUserByIdDao,
    getUserByEmailDao
};
