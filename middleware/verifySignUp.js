const db = require('../models');
const Op = db.Sequelize.Op;
const User = db.user;

module.exports = {

  checkDuplicateEmail: async (req, res, next) => {
    // Email
    const userEmail = await User.findOne({
      where: {
        email: {[Op.like]: req.body.email},
      },
    });

    if (userEmail) {
      res.status(400).send({
        status: 0,
        message: 'Failed! Email is already in use!',
      });
      return;
    }

    next();
  },
};

