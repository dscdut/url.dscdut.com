const express = require('express');

const router = express.Router();

const { UserController } = require('../api/users/user.controller');
const { UserInterceptor } = require('../modules/users/interceptor');

router.post('/', UserInterceptor, UserController.createOne);

module.exports = router;
