"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = __importDefault(require("../utils/regex"));
var Joi = require('@hapi/joi');
var validatePasswordApiValidation = function (reqBody) {
    var schema = Joi.object({
        'password': Joi.string().min(8).max(1024).regex(regex_1.default.PASSWORD).required()
    });
    return schema.validate(reqBody);
};
exports.validatePasswordApiValidation = validatePasswordApiValidation;
var validatePasswordWhileUpdating = function (reqBody) {
    var schema = Joi.object({
        'password': Joi.string().min(8).max(1024).regex(regex_1.default.PASSWORD).required(),
        'newPassword': Joi.string().min(8).max(1024).regex(regex_1.default.PASSWORD).required()
    });
    return schema.validate(reqBody);
};
exports.validatePasswordWhileUpdating = validatePasswordWhileUpdating;
var validateUpdateBodyRequest = function (reqBody) {
    var schema = Joi.object({
        'name': Joi.string().strict().trim().min(3).max(30)
    });
    return schema.validate(reqBody);
};
exports.validateUpdateBodyRequest = validateUpdateBodyRequest;
