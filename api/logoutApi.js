const express = require('express');
const logoutService = require('../services/logoutService');
const logoutApi = express.Router();

// Route to handle user logout
logoutApi.post('/user/logout', logoutService.logoutUserService);

module.exports = logoutApi;
