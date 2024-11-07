const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config');
const initModels = require('./init-models');
const sequelize = new Sequelize( config.db.database, config.db.username, config.db.password, config.db );
const models = initModels(sequelize);

module.exports = {sequelize: sequelize, Sequelize: Sequelize, ...models};
