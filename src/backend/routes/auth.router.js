const router = require('express').Router();

const { AuthController } = require('../api/auth/auth.controller');
const { TokenInterceptor } = require('../modules/auth/interceptor/index');

router.post('/signup', ...TokenInterceptor, AuthController.signup);
router.post('/signin', AuthController.signin);

module.exports = router;
