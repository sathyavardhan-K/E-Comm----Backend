const express = require('express');
const userService = require('../services/userService');
const validateUser = require('../middlewares/validateUser');
// const authenticate = require('../middlewares/authenticate');
// const authorize = require('../middlewares/authorize');

const userApi = express.Router();



userApi.post('/user', validateUser, userService.createUserService);
userApi.put('/user/:id', userService.updateUserByIdService);
userApi.delete('/user/:id', userService.deleteUserByIdService);

userApi.get('/user', userService.getAllUsersService);

userApi.get('/user/:id', userService.getUserByIdService);

module.exports = userApi;
