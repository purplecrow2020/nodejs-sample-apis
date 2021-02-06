require('dotenv').config()

const Joi = require('joi');


const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production').default('development'),
    PORT: Joi.number().default(3000),

    MYSQL_HOST_WRITE: Joi.string().required().description('Mysql host write'),
    MYSQL_USER_WRITE: Joi.string().required().description('Mysql username write'),
    MYSQL_DB_WRITE: Joi.string().required().description('Mysql dbname write'),
    MYSQL_PASS_WRITE: Joi.string().required().description('Mysql password write'),

    MYSQL_HOST_READ: Joi.string().required().description('Mysql host read'),
    MYSQL_USER_READ: Joi.string().required().description('Mysql username read'),
    MYSQL_DB_READ: Joi.string().required().description('Mysql sbname read'),
    MYSQL_PASS_READ: Joi.string().required().description('Mysql password write'),
    JWT_SECRET : Joi.string().required().description('jwt secret'),

    ADMIN_EMAIL : Joi.string().required().description('admin email'),
    ADMIN_USERNAME : Joi.string().required().description('admin username'),
    ADMIN_PASSWORD : Joi.string().required().description('admin password'),
}).unknown().required();


const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const appConfig = {
    env : envVars.NODE_ENV,
    port :envVars.PORT,
    mysql : {
        read : {
            host: envVars.MYSQL_HOST_READ,
            user: envVars.MYSQL_USER_READ,
            password: envVars.MYSQL_PASS_READ,
            database: envVars.MYSQL_DB_READ,
        },
        write : {
            host: envVars.MYSQL_HOST_WRITE,
            user: envVars.MYSQL_USER_WRITE,
            password: envVars.MYSQL_PASS_WRITE,
            database: envVars.MYSQL_DB_WRITE,
        }
    },
    versions: {
        "Version 1": "/v1"
    },
    jwtSecret : envVars.JWT_SECRET,
    admin : {
        email : envVars.ADMIN_EMAIL,
        username : envVars.ADMIN_USERNAME,
        password : envVars.ADMIN_PASSWORD
    }
}


module.exports = { ...appConfig};