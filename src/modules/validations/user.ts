import regex from '../utils/regex';
const Joi = require('@hapi/joi');

const validatePasswordApiValidation = (reqBody: any) => {
	const schema = Joi.object({
		'password': Joi.string().min(8).max(1024).regex(regex.PASSWORD).required()
	});
	return schema.validate(reqBody);
};

const validatePasswordWhileUpdating = (reqBody: any) => {
	const schema = Joi.object({
		'password': Joi.string().min(8).max(1024).regex(regex.PASSWORD).required(),
		'newPassword': Joi.string().min(8).max(1024).regex(regex.PASSWORD).required()
	});
	return schema.validate(reqBody);
};

const validateUpdateBodyRequest = (reqBody: any) => {
	const schema = Joi.object({
		'name': Joi.string().strict().trim().min(3).max(30)
	});
	return schema.validate(reqBody);
};

export { validatePasswordApiValidation, validateUpdateBodyRequest, validatePasswordWhileUpdating };
