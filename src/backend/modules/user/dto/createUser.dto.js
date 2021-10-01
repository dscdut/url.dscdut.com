module.exports.CreateUserDto = body => ({
    email: body.email,
    fullName: body.name,
});
