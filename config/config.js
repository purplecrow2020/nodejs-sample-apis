require('dotenv').config();

const Joi = require('joi');

const envVarsSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production').default('development'),
    PORT: Joi.number().default(3000),

    MYSQL_HOST: Joi.string().required().description('Mysql host'),
    MYSQL_USER: Joi.string().required().description('Mysql username'),
    MYSQL_DB: Joi.string().required().description('Mysql dbname'),
    MYSQL_PASS: Joi.string().required().description('Mysql password'),

    JWT_SECRET: Joi.string().required().description('jwt secret'),

    ADMIN_EMAIL: Joi.string().required().description('admin email'),
    ADMIN_USERNAME: Joi.string().required().description('admin username'),
    ADMIN_PASSWORD: Joi.string().required().description('admin password'),
}).unknown().required();

const { error, value: envVars } = envVarsSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const appConfig = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mysql: {
        host: envVars.MYSQL_HOST,
        user: envVars.MYSQL_USER,
        password: envVars.MYSQL_PASS,
        database: envVars.MYSQL_DB,
    },
    versions: {
        'Version 1': '/v1',
    },
    jwtSecret: envVars.JWT_SECRET,
    admin: {
        email: envVars.ADMIN_EMAIL,
        username: envVars.ADMIN_USERNAME,
        password: envVars.ADMIN_PASSWORD,
    },
};

module.exports = { ...appConfig };
