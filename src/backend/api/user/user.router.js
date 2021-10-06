const express = require('express');
const { AuthRequired } = require('../../modules/auth/guard/authRequired');

const router = express.Router();

const { UserController } = require('./user.controller');

router.get('/detail', AuthRequired(), UserController.getOne);

module.exports.userRouter = router;
