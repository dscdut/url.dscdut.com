const { SignInInterceptor } = require('./signIn.interceptor');

module.exports.TokenInterceptor = [
    SignInInterceptor.intercept
];
