const controller = require('../../../controllers/course');

module.exports = function(app) {
    app.post('/api/v1/courses', controller.getCoursesList);
  };