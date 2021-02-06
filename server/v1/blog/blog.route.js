const express = require('express');
const validate = require('express-validator');
const paramValidation = require('./routeValidation');
const AuthMiddleware = require('../../../middlewares/auth');

const blogCtrl = require('./blog.controller');

const router = express.Router();

router.route('/get-all-posts').get(validate(paramValidation.blog.getAll), AuthMiddleware.authenticateApiKey, blogCtrl.getAllBlogPosts);
router.route('/get-post-by-id/:post_id').get(validate(paramValidation.blog.getById), AuthMiddleware.authenticateApiKey, blogCtrl.getPostById);
router.route('/get-filtered-posts').get(validate(paramValidation.blog.filterPosts), blogCtrl.filterBlogPosts);
router.route('/add-post').post(validate(paramValidation.blog.addOne), AuthMiddleware.authenticateApiKey, blogCtrl.addBlogPost);
router.route('/delete-post-by-id/:post_id').delete(validate(paramValidation.blog.deletePostsById), AuthMiddleware.authenticateApiKey, blogCtrl.deletePostsById);
router.route('/edit-post-by-id/:post_id').put(validate(paramValidation.blog.editBlogPost), AuthMiddleware.authenticateApiKey, blogCtrl.editBlogPost);

module.exports = router;
