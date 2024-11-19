const controller = require('../../../controllers/curriculam');

module.exports = function(app) {
    app.post('/api/v1/curriculam', controller.getCurriculamVidoes);
    app.post('/api/v1/curriculam/upload', controller.uploadCurriculamVidoes);
  };