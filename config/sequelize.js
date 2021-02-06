const Sequelize = require('sequelize');
const config = require('./config');


console.log(config.mysql.host);

const sequelize = new Sequelize(config.mysql.database,config.mysql.user,config.mysql.password, {
    dialect : 'mysql',
    host: config.mysql.host,
});

module.exports = sequelize;