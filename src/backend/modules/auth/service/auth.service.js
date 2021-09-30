const { UserService } = require('../../user/user.service');
const { OAuthService } = require('./oauth.service');
const { JwtService } = require('./jwt.service');
const { CreateUserDto } = require('../../user/dto/createUser.dto');
const { UnAuthorizedException } = require('../../../common/httpException');
const { JwtSign } = require('../dto/jwtSign.dto');

class Service {
    constructor() {
        this.oauthService = OAuthService;
        this.userService = UserService;
        this.jwtService = JwtService;
    }

    async signin(token) {
        let userInfo;
        try {
            userInfo = await this.oauthService.verify(token);
        } catch (error) {
            throw new UnAuthorizedException('Your token is invalid');
        }
        const isUserExist = await this.userService.findByEmail(CreateUserDto(userInfo).email);
        if (!isUserExist) await this.userService.createOne(CreateUserDto(userInfo));
        const jwtToken = await this.jwtService.sign(JwtSign(userInfo));
        return {
            email: userInfo.email,
            token: jwtToken,
        };
    }
}

module.exports.AuthService = new Service();
