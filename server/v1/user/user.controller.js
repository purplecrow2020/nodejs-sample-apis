const _ = require('lodash');
const UserMysql = require('../../../models/users');
const Auth = require('../../../config/auth');

async function signUp(req, res, next) {
    try {
        const { email_id, username, password } = req.body;
        const resp = await UserMysql.create({ email_id, user_name: username, password });
        if (!_.isEmpty(resp)) {
            const user_id = resp.id;
            const apiKey = Auth.generateToken({ user_id });
            const data = {
                email_id,
                api_Key: apiKey,
            };
            const responseData = {
                meta: {
                    code: 200,
                    success: true,
                    message: 'SUCCESS',
                },
                data,
            };
            return res.status(responseData.meta.code).json(responseData);
        }
    } catch (e) {
        const responseData = {
            meta: {
                code: 403,
                success: false,
                message: (e.errors[0].message || 'ERROR') == 'email_id must be unique' ? 'SIGNED UP ALREADY, PLEASE LOGIN' : (e.errors[0].message || 'ERROR'),
            },
            data: null,
        };
        return res.status(responseData.meta.code).json(responseData);
    }
}

async function login(req, res, next) {
    try {
        const { email_id, password } = req.body;
        const userExists = await UserMysql.findOne({
            where: {
                email_id,
                password,
            },
        });
        if (!_.isEmpty(userExists)) {
            const apiKey = Auth.generateToken({ user_id: userExists.id });
            const data = {
                email_id,
                api_Key: apiKey,
            };
            const responseData = {
                meta: {
                    code: 200,
                    success: true,
                    message: 'SUCCESS',
                },
                data,
            };
            return res.status(responseData.meta.code).json(responseData);
        }
        throw new Error('INVALID EMAIL-ID OR PASSWORD');
    } catch (e) {
        const responseData = {
            meta: {
                code: 401,
                success: true,
                message: e.message,
            },
            data: null,
        };
        return res.status(responseData.meta.code).json(responseData);
    }
}

module.exports = {
    signUp,
    login,
};
