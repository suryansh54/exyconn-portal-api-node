"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = __importDefault(require("../utils/regex"));
var Joi = require('@hapi/joi');
// const tokenApiValidation = (reqBody: any) => {
// 	let schema = Joi.object({
// 		'email': Joi.string().regex(regex.EMAIL),
// 		'mobile': Joi.string().min(10).max(13).regex(regex.PHONE),
// 		'password': Joi.string().min(8).max(1024).required()
// 	})
// 	return schema.validate(reqBody);
// }
var tokenApiValidation = function (reqBody) {
    var userSchema = Joi.alternatives().try(Joi.object().keys({
        mobile: Joi.string().min(10).max(13).regex(regex_1.default.PHONE).required(),
        password: Joi.string().min(8).max(1024).required(),
        email: Joi.string().regex(regex_1.default.EMAIL)
    }), Joi.object().keys({
        mobile: Joi.string().min(10).max(13).regex(regex_1.default.PHONE),
        password: Joi.string().min(8).max(1024).required(),
        email: Joi.string().regex(regex_1.default.EMAIL).required()
    }));
    return userSchema.validate(reqBody);
};
exports.tokenApiValidation = tokenApiValidation;
var signUpApiValidation = function (reqBody) {
    var schema = Joi.object({
        'email': Joi.string().regex(regex_1.default.EMAIL).required(),
        'mobile': Joi.string().regex(regex_1.default.PHONE).required(),
        'name': Joi.string().strict().trim().min(3).max(50).regex(regex_1.default.NAME).required(),
        'role': Joi.string().strict().trim().min(3).max(50),
        'password': Joi.string().strict().trim().min(6).max(20).regex(regex_1.default.PASSWORD).required()
    });
    return schema.validate(reqBody);
};
exports.signUpApiValidation = signUpApiValidation;
var forgetPasswordApiValidation = function (reqBody) {
    var schema = Joi.object({
        'email': Joi.string().regex(regex_1.default.EMAIL),
        'mobile': Joi.string().regex(regex_1.default.PHONE)
    });
    return schema.validate(reqBody);
};
exports.forgetPasswordApiValidation = forgetPasswordApiValidation;
var validateOTPApiValidation = function (reqBody) {
    var schema = Joi.object({
        'email': Joi.string().regex(regex_1.default.EMAIL),
        'mobile': Joi.string().min(10).max(13).regex(regex_1.default.PHONE),
        'otp': Joi.string().min(6).max(6).regex(regex_1.default.OTP).required()
    });
    return schema.validate(reqBody);
};
exports.validateOTPApiValidation = validateOTPApiValidation;
var changePasswordApiValidation = function (reqBody) {
    var schema = Joi.object({
        'email': Joi.string().regex(regex_1.default.EMAIL),
        'mobile': Joi.string().min(10).max(13).regex(regex_1.default.PHONE),
        'temp_id': Joi.string().min(8).max(12).required(),
        'newPass': Joi.string().min(8).max(1024).regex(regex_1.default.PASSWORD).required()
    });
    return schema.validate(reqBody);
};
exports.changePasswordApiValidation = changePasswordApiValidation;
