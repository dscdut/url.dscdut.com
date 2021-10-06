module.exports.CreateUserDto = body => ({
    email: body.email,
    fullName: body.name,
    avatar: body.picture
});
