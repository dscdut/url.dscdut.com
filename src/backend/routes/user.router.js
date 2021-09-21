const express = require('express');
const router = express.Router();

const { UserController } = require('../api/url/user.controller');
const { CreateUserInterceptor } = require('../modules/users/interceptor');

router.post('/', CreateUserInterceptor, UserController.createUser);

module.exports = router;