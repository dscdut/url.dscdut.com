module.exports = class UserModel {
    email;

    fullName;

    constructor(email = null, fullName = null) {
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
