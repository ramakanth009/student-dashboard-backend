const db = require('../models');

exports.getCoursesList = async (req, res, next) => {
  const courseType = req.body.courseType;
  try {
    let data = await db.courses.findAll({
      where: {'course_type': courseType},
    });
    

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (e) {
    next(e);
  }
};
