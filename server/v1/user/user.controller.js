const UserMysql = require('../../../models/users');
const Auth = require('../../../config/auth');
const _ = require('lodash');

async function signUp(req,res,next){
    try{
        const { email_id, username, password } = req.body;
        let resp = await UserMysql.create({ email_id: email_id, user_name: username, password: password});
        if(!_.isEmpty(resp)){
            let user_id = resp.id;
            let apiKey = Auth.generateToken({user_id});
            let data = {
                email_id,
                api_Key : apiKey
            };
            const responseData = {
                meta: {
                    code: 200,
                    success: true,
                    message: 'SUCCESS'
                },
                data : data
            };
            return res.status(responseData.meta.code).json(responseData);
        }
    }catch(e){
        console.log(e.errors[0].message);
        const responseData = {
            meta: {
                code: 401,
                success: false,
                message: (e.errors[0].message || 'ERROR')  ==  'email_id must be unique' ? 'SIGNED UP ALREADY, PLEASE LOGIN' : (e.errors[0].message || 'ERROR'),
            },
            data :null
        };
        return res.status(responseData.meta.code).json(responseData);
    }
    
}

async function login(req,res,next){
    try{
        const { email_id, password } = req.body;
        const userExists = await UserMysql.findOne({
            where : {
                email_id : email_id,
                password : password
            }
        });
        if(!_.isEmpty(userExists)){
            let apiKey = Auth.generateToken({user_id : userExists.id});
            let data = {
                email_id,
                api_Key : apiKey
            };
            const responseData = {
                meta: {
                    code: 200,
                    success: true,
                    message: 'SUCCESS'
                },
                data : data
            };
            return res.status(responseData.meta.code).json(responseData);
        }else{
           throw new Error("INVALID EMAIL-ID OR PASSWORD");
        }
    }catch(e){
        console.log(e);
        const responseData = {
            meta: {
                code: 401,
                success: true,
                message: e.message,
            },
            data :null,
        };
        return res.status(responseData.meta.code).json(responseData);
    }
}


module.exports = {
    signUp,
    login
}