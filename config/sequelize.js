const Sequelize = require('sequelize');
const config = require('./config');


console.log(config.mysql.write.host);

const sequelize = new Sequelize(config.mysql.write.database,config.mysql.write.user,config.mysql.write.password, {
    dialect : 'mysql',
    host: config.mysql.write.host,
});

module.exports = sequelize;