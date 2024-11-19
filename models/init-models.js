var DataTypes = require("sequelize").DataTypes;
var _user = require("./user");
var _userRefreshToken = require("./userRefreshToken");
var _userRole = require("./userRole");
var _courses = require('./course');
var _curriculam = require('./curriculam');

function initModels(sequelize) {
  var user = _user(sequelize, DataTypes);
  // var userRefreshToken = _userRefreshToken(sequelize, DataTypes);
  var userRole = _userRole(sequelize, DataTypes);
  var courses = _courses(sequelize, DataTypes);
  var curriculam = _curriculam(sequelize, DataTypes);

  // userRefreshToken.belongsTo(user, { as: "user", foreignKey: "userId"});
  // user.hasMany(userRefreshToken, { as: "userRefreshTokens", foreignKey: "userId"});
  userRole.belongsTo(user, { as: "user", foreignKey: "userId"});
  user.hasMany(userRole, { as: "userRoles", foreignKey: "userId"});
  userRole.belongsTo(user, { as: "createdByUser", foreignKey: "createdBy"});
  user.hasMany(userRole, { as: "createdByUserRoles", foreignKey: "createdBy"});

  return {
    user,
    // userRefreshToken,
    userRole,
    courses,
    curriculam
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
