const { UserService } = require('../../user/user.service');
const { OAuthService } = require('./oauth.service');
const { JwtService } = require('./jwt.service');
const { CreateUserDto } = require('../../user/dto/createUser.dto');
const { UnAuthorizedException } = require('../../../common/httpException');
const { JwtSign } = require('../dto/jwtSign.dto');

class Service {
    constructor() {
        this.oauth = OAuthService;
        this.userService = UserService;
        this.jwt = JwtService;
    }

    async signup(token) {
        const userInfo = await this.verifyToken(token);
        if (userInfo.email_verified) await this.userService.createOne(CreateUserDto(userInfo));
        else throw new UnAuthorizedException('User not found');
    }

    async signin(token) {
        const userInfo = await this.verifyToken(token);
        const isUserExist = await this.userService.findOne(CreateUserDto(userInfo).email);
        if (!isUserExist) await this.signup(token);
        const jwtToken = await this.jwt.sign(JwtSign(userInfo));
        return jwtToken;
    }

    async verifyToken(token) {
        const userInfo = await this.oauth.verify(token);
        return userInfo;
    }
}

module.exports.AuthService = new Service();
