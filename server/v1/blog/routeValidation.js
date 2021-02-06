const Joi = require('joi');

module.exports = {
    blog: {
        getAll: {
            body: {

            },
        },
        getById: {
            post_id: Joi.number().required(),
        },
        filterPosts: {
            body: {
                filter_type: Joi.string().required(),
                lookup: Joi.string().required(),
            },
        },
        addOne: {
            body: {
                title: Joi.string().email().required(),
                content: Joi.string().required(),
            },
        },
        editBlogPost: {
            body: {

            },
        },
        deletePostsById: {
            post_id: Joi.number().required(),
        },
    },
};
