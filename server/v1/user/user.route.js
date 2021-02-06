const express = require('express');
const validate = require('express-validator');
const paramValidation = require('./routeValidation');

const userCtrl = require('./user.controller');

const router = express.Router();

router.route('/sign-up').post(validate(paramValidation.user.signup), userCtrl.signUp);
router.route('/login').post(validate(paramValidation.user.login), userCtrl.login);

module.exports = router;
