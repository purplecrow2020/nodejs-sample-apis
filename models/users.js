const Sequelize =  require('sequelize');
const sequelize = require('../config/sequelize');


const Users = sequelize.define('users',{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    email_id : {
        type : Sequelize.STRING(30),
        allowNull : false,
    },
    user_name : {
        type : Sequelize.STRING(30),
        allowNull : false,
        unique : true
    },
    password : {
        type : Sequelize.STRING(30),
        allowNull : false
    },
    is_admin :{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        index : true
    },
    rate_limit :{
        type : Sequelize.INTEGER,
        allowNull : true
    }
},{
    indexes : [
        {
            unique : true,
            fields: ['email_id','password',]
        }
    ]
});

module.exports = Users;