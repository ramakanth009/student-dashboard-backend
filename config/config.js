const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, `../${process.env.NODE_ENV}.env`),
});

module.exports = {
  baseUrl: process.env.BASE_URL || 'http://localhost:4000',
  db: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_ENGINE,
    logging: (process.env.NODE_ENV == 'production') ? false : console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  jwtAccessTokenSecret: 'Acce55k3y',
  jwtRefreshTokenSecret: 'R3fre5hk3y',
  jwtAccessTokenExpiration: 30*60, // 30*60 // 30 minutes
  jwtRefreshTokenExpiration: 1*60*60, // 1*60*60, // 1 Hour
};
