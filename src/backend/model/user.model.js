module.exports = class user {
    constructor(body) {
        this.username = body.username;
        this.password = body.password;
    }

    toJSon() {
        return {
            username: this.username,
            password: this.password,
        };
    }
};
