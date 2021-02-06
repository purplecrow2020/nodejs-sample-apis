const Auth = require('../config/auth');
const UserMysql = require('../models/users');
const _ = require('lodash');

async function authenticateApiKey(req,res,next){
    try{
        const redisClient = req.app.get('redis');
        const api_key  = req.headers['api-key'];
        const payload = Auth.validateKey(api_key);
        const {user_id} = payload;
        let userDetails = await UserMysql.findByPk(user_id);
        if(!_.isEmpty(userDetails)){
            req.user = userDetails;
            if(userDetails.is_admin){
                next();
            }else{
                const rate_limit = !_.isEmpty(userDetails.rate_limit) ? userDetails.rate_limit : 100;
                let apiUsageTraces = await redisClient.getAsync(api_key);
                if(_.isNull(apiUsageTraces)){
                    await redisClient.setAsync(api_key,1,'EX',60 * 5);
                }else{
                    if(parseInt(apiUsageTraces) > rate_limit ){
                        throw new Error('rate limit exceeded');
                    }else{
                        await redisClient.incr(api_key);
                    }
                }
                next();
            }
        }else{
            const responseData = {
                meta: {
                    code: 401,
                    success: false,
                    message: 'INVALID API KEY',
                },
                data :null
            };
            return res.status(responseData.meta.code).json(responseData);
        }
    }catch(e){
        const responseData = {
            meta: {
                code: 200,
                success: false,
                message: e.message,
            },
            data :null,
        };
        return res.status(responseData.meta.code).json(responseData); 
    }
}


module.exports = {
    authenticateApiKey
}