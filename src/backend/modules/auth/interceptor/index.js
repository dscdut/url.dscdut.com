const { SignInInterceptor } = require('./signin.interceptor');

module.exports.AuthInterceptor = [
    SignInInterceptor.intercept
];
