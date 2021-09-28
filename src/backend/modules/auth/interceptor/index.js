const { CreateTokenInterceptor } = require('./createToken.interceptor');

module.exports.TokenInterceptor = [
    CreateTokenInterceptor.intercept
];
