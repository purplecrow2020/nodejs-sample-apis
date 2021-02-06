const Sequelize =  require('sequelize');
const sequelize = require('../config/sequelize');


const Blogs = sequelize.define('blogs',{
    id : { 
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull :false,
        primaryKey : true
    },
    author : {
        type : Sequelize.STRING,
        allowNull :false,
    },
    title : {
        type : Sequelize.STRING,
        allowNull :false,
    },
    content :{
        type : Sequelize.STRING,
        allowNull :false,
    } 
});

module.exports = Blogs;