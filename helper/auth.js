const config = require('../config/config');
const {userRefreshToken: UserRefreshToken} = require('../models');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const self = {

  generateAccessToken: (user) => {
    return jwt.sign({userId: user.id, fullName: user.fullName, roles: user.userRoles}, config.jwtAccessTokenSecret, {expiresIn: config.jwtAccessTokenExpiration});
  },

  generateRefreshToken: async (user, create = true) => {
    // create a refresh token
    const refreshToken = jwt.sign({userId: user.id, fullName: user.fullName, roles: user.userRoles}, config.jwtRefreshTokenSecret, {expiresIn: config.jwtRefreshTokenExpiration});
    const data = {
      userId: user.id,
      token: refreshToken,
      expires: moment().add(config.jwtRefreshTokenExpiration, 'seconds').toString(),
    };

    return create ? UserRefreshToken.create(data) : data;
  },
};

module.exports = self;
