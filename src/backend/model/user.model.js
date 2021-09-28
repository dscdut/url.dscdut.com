module.exports = class UserModel {
    email;

    password;

    fullName;

    constructor(email = null, password = null, fullName = null) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
    }

    toJSon() {
        return {
            email: this.email,
            password: this.password,
            fullName: this.fullName,
        };
    }
};
