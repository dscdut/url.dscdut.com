module.exports = class UserModel {
    email;

    fullName;

    constructor(email, fullName) {
        this.email = email;
        this.fullName = fullName;
    }

    toJSon() {
        return {
            email: this.email,
            fullName: this.fullName,
        };
    }
};
