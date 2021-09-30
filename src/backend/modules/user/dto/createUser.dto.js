module.exports.CreateUserDto = body => ({
    email: body.email.toLowerCase(),
    fullName: body.name,
});
