const Sequelize = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.mysql.database, config.mysql.user, config.mysql.password, {
    dialect: 'mysql',
    host: config.mysql.host,
});

module.exports = sequelize;
