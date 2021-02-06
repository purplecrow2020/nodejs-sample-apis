const express = require('express');
const app  = express();
const config = require('./config');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const sequelize = require('./sequelize');
const UsersModel = require('../models/users');
const BlogsModel = require('../models/blogs');
const mysql = require('mysql2/promise');
const redis = require('redis');
const bluebird = require('bluebird');

const redisClient = redis.createClient();
bluebird.promisifyAll(redis);



app.set('config', config);
app.set('redis', redisClient);


app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '200mb' }));
app.use(bodyParser.json({ limit: '50mb' }));


dbInit();

async function dbInit(){
    const  { host ,user, database, password} =  config.mysql;
    const connection = await mysql.createConnection({ host, user, password});
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    sequelize.sync().then((res)=>{
        console.log('ok');
        UsersModel.findOne({
            where : {
                is_admin : 1,
            }
        }).then((admin_user)=>{
            if(admin_user == null){
                UsersModel.create({
                    email_id: config.admin.email, 
                    user_name: config.admin.username, 
                    password: config.admin.password,
                    is_admin : true
                });
            }
        });
    }).catch((err)=>{
        console.log('oj');
    });
}


for (const k in config.versions) {
    app.use(config.versions[k], require(`../server${config.versions[k]}/index.route`));
}






module.exports = app;


