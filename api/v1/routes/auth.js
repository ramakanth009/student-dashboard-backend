const {verifySignUp} = require('../../../middleware');
const controller = require('../../../controllers/auth');

module.exports = function(app) {
  app.post(
      '/api/v1/signup',
      [verifySignUp.checkDuplicateEmail],
      controller.signup,
  );

  app.post('/api/v1/signin', controller.signin);

  // app.get('/api/v1/refresh-token', controller.refreshToken);

  app.get('/api/v1/logout', controller.logout);
};
