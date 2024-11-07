const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = {

  verifyJWT: (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return res.status(400).send({status: 0, message: 'Invalid authorization header'});
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        config.jwtAccessTokenSecret,
        (err, decoded) => {
          if (err) return res.status(401).send({status: 0, message: 'Invalid access token'}); // invalid token
          req.userId = decoded.userId;
          req.roles = decoded.roles;
          next();
        },
    );
  },
};
