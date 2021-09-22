const express = require('express');

const router = express.Router();

const { UserController } = require('../api/user/user.controller');
const { UserInterceptor } = require('../modules/user/interceptor');

router.post('/', ...UserInterceptor, UserController.createOne);

module.exports = router;
