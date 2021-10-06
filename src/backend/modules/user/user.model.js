module.exports = class UserModel {
    email;

    fullName;

    avatar;

    constructor(email, fullName, avatar) {
        this.email = email;
        this.fullName = fullName;
        this.avatar = avatar;
    }

    toJSon() {
        return {
            email: this.email,
            fullName: this.fullName,
            avatar: this.avatar,
        };
    }
};
