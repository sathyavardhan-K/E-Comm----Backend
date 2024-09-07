
const express = require('express');
const loginService = require('../services/loginService');
const validateLogin = require('../middlewares/validateLogin');
const loginApi = express.Router();

// Route to handle user login
loginApi.post('/user/login', validateLogin, loginService.loginUserService);

module.exports = loginApi;
