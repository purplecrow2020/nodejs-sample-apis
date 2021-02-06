const Joi = require("joi");

module.exports = {
    user: {
        signup : {
            body : {
               email : Joi.string().email().required(), 
               username : Joi.string().required(),
               password : Joi.string().required()
            }
        },
        login : {
            body : {
               email : Joi.string().email().required(), 
               password : Joi.string().required()
            }
        }
    }
};
