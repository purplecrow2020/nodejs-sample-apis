const BlogsMysql = require('../../../models/blogs');
const _ =require('lodash');
const Sequelize = require('sequelize');

async function getAllBlogPosts(req, res, next) {
    try{
        const blogPosts = await BlogsMysql.findAll({ 
            attributes : [ 'id','title','author']});
        const responseData = {
            meta: {
                code: 200,
                success: true,
                message: 'SUCCESS',
            },
            data :blogPosts,
        };
        return res.status(responseData.meta.code).json(responseData);
    }catch(e){
        const responseData = {
            meta: {
                code: 403,
                success: false,
                message: e.message || 'ERROR',
            },
            data :null,
        };
        return res.status(responseData.meta.code).json(responseData); 
    }
}

async function getPostById(req, res, next) {
    try{
        const post_id = req.params.post_id;
        console.log("post_id",post_id);
        const blogDetails = await BlogsMysql.findByPk(post_id);
        console.log(blogDetails);
        const responseData = {
            meta: {
                code: 200,
                success: true,
                message: 'SUCCESS',
            },
            data :blogDetails,
        };
        return res.status(responseData.meta.code).json(responseData);
    }catch(e){
        const responseData = {
            meta: {
                code: 403,
                success: false,
                message: e.message || 'ERROR',
            },
            data :null,
        };
        return res.status(responseData.meta.code).json(responseData); 
    }
}

async function addBlogPost(req, res, next) {
    try {
        const { title,content } = req.body;
        let resp = await BlogsMysql.create({
            author : req.user.user_name,
            title ,
            content
        });
        const responseData = {
            meta: {
                code: 200,
                success: true,
                message: 'SUCCESS',
            },
            data :null,
        };
        return res.status(responseData.meta.code).json(responseData);
    } catch (e) {
        const responseData = {
            meta: {
                code: 403,
                success: false,
                message: e.message || 'ERROR',
            },
            data :null,
        };
        return res.status(responseData.meta.code).json(responseData); 
    }
}

async function editBlogPost(req, res, next) {
    try {
        const { post_id } = req.params;
        console.log('post_id',post_id);
        const { title,content } = req.body;
        const post = await BlogsMysql.findByPk(post_id);
        if(_.isNull(post)){
            throw new Error("NO SUCH POST EXISTS");
        }
        if(post.author == req.user.user_name || req.user.is_admin){
            if(!_.isEmpty(title)){
                post.title = title;
            }
    
            if(!_.isEmpty(content)){
                post.content = content;
            }
    
            await post.save();
            const responseData = {
                meta: {
                    code: 200,
                    success: true,
                    message: 'SUCCESS',
                },
                data :null,
            };
            return res.status(responseData.meta.code).json(responseData);
        }else{
            throw new Error("INSUFFICIENT PERMISSIONS");
        }
    } catch (e) {
        const responseData = {
            meta: {
                code: 403,
                success: false,
                message: e.message,
            },
            data :null,
        };
        return res.status(responseData.meta.code).json(responseData); 
    }
}

async function deletePostsById(req, res, next) {
    try{
        const { post_id } = req.params;
        let post = await BlogsMysql.findByPk(post_id);
        if(_.isNull(post)){
            throw new Error("NO SUCH POST EXISTS");
        }
        if(post.author == req.user.user_name || req.user.is_admin){
            await post.destroy();
            const responseData = {
                meta: {
                    code: 200,
                    success: true,
                    message: 'POST SUCCESSFULLY DELETED',
                },
                data :null,
            };
            return res.status(responseData.meta.code).json(responseData);
        }else{
            // CANT DELETE OTHER's POST
            throw new Error("INSUFFICIENT PERMISSIONS");
        }
    }catch(e){
        const responseData = {
            meta: {
                code: 403,
                success: false,
                message: e.message,
            },
            data :null,
        };
        return res.status(responseData.meta.code).json(responseData);
    }
}


async function filterBlogPosts(req,res,next){
    try{
        const { filter_type , lookup } = req.query;
        const valid_filters_types = ['author' , 'title'];
        if(!valid_filters_types.includes(filter_type)){
            throw new Error("INVALID FILTER TYPE");
        }
        const filteredResults = await BlogsMysql.findAll({
            where  : {
                [filter_type] : {
                    [Sequelize.Op.like] : `%${lookup}%`
                }
            }
        });
        const responseData = {
            meta: {
                code: 200,
                success: true,
                message: 'SUCCESS',
            },
            data :filteredResults,
        };
        return res.status(responseData.meta.code).json(responseData);
    }catch(e){
        const responseData = {
            meta: {
                code: 403,
                success: false,
                message: e.message,
            },
            data :null,
        };
        return res.status(responseData.meta.code).json(responseData);
    }
}


module.exports = {
    getAllBlogPosts,
    addBlogPost,
    getPostById,
    filterBlogPosts,
    deletePostsById,
    editBlogPost
}