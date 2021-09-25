module.exports = class UserModel {
    email;

    password;

    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    toJSon() {
        return {
            email: this.email,
            password: this.password,
        };
    }
};
