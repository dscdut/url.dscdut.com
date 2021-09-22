module.exports.CreateUserDto = body => ({
    email: body.email,
    password: body.password,
});
