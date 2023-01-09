const { OAuth2Client } = require('google-auth-library');
const { CLIENT_ID } = require('@env');

class OAuthServiceImp {
    client = new OAuth2Client(CLIENT_ID);

    /**
     * @param {String} token
     */
    verify = async token => {
        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        return ticket.getPayload();
    }
}

module.exports.OAuthService = new OAuthServiceImp();
