const { CreateUserInterceptor } = require('./createUser.Interceptor');

module.exports.UserInterceptor = [
    CreateUserInterceptor.intercept
];
