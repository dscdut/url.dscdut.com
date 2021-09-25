module.exports.CreateUserDto = body => ({
    email: body.email.toLowerCase(),
    password: body.password,
});
