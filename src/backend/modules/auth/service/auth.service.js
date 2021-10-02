const { UserService } = require('../../user/user.service');
const { OAuthService } = require('./oauth.service');
const { JwtService } = require('./jwt.service');
const { CreateUserDto } = require('../../user/dto/createUser.dto');
const { UnAuthorizedException } = require('../../../common/httpException');
const { JwtSign } = require('../dto/jwtSign.dto');
const { UserRepository } = require('../../user/user.repository');

class AuthServiceImp {
    constructor() {
        this.oauthService = OAuthService;
        this.userService = UserService;
        this.jwtService = JwtService;
        this.userRepository = UserRepository;
    }

    async signIn(token) {
        let userInfo;
        try {
            userInfo = await this.oauthService.verify(token);
        } catch (error) {
            throw new UnAuthorizedException('Invalid token');
        }
        const isUserExist = await this.userRepository.findByEmail(userInfo.email);
        if (!isUserExist) await this.userService.createOne(CreateUserDto(userInfo));
        const accessToken = this.jwtService.sign(JwtSign(userInfo));
        return {
            email: userInfo.email,
            accessToken,
        };
    }
}

module.exports.AuthService = new AuthServiceImp();
