const { UserService } = require('../../user/user.service');
const { OAuthService } = require('./oauth.service');
const { JwtService } = require('./jwt.service');
const { CreateUserDto } = require('../../user/dto/createUser.dto');
const { UnAuthorizedException } = require('../../../common/httpException');
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

        let userId = '';
        const isUserExist = await this.userRepository.findByEmail(userInfo.email);
        if (isUserExist) {
            userId = isUserExist.id;
        } else {
            const res = await this.userService.createOne(CreateUserDto(userInfo));
            userId = res.id;
        }
        const accessToken = this.jwtService.sign({ email: userInfo.email, id: userId });
        return {
            email: userInfo.email,
            accessToken,
        };
    }
}

module.exports.AuthService = new AuthServiceImp();
