const router = require('express').Router();

const { AuthController } = require('../api/auth/auth.controller');
const { TokenInterceptor } = require('../modules/auth/interceptor/index');

router.post('/signin', ...TokenInterceptor, AuthController.signin);

module.exports = router;
