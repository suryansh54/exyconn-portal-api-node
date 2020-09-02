import regex from '../utils/regex';
const Joi = require('@hapi/joi');

// const tokenApiValidation = (reqBody: any) => {
// 	let schema = Joi.object({
// 		'email': Joi.string().regex(regex.EMAIL),
// 		'mobile': Joi.string().min(10).max(13).regex(regex.PHONE),
// 		'password': Joi.string().min(8).max(1024).required()
// 	})
// 	return schema.validate(reqBody);
// }
const tokenApiValidation = (reqBody: any) => {
	const userSchema = Joi.alternatives().try(
		Joi.object().keys({
			mobile: Joi.string().min(10).max(13).regex(regex.PHONE).required(),
			password: Joi.string().min(8).max(1024).required(),
			email: Joi.string().regex(regex.EMAIL)
		}),
		Joi.object().keys({
			mobile: Joi.string().min(10).max(13).regex(regex.PHONE),
			password: Joi.string().min(8).max(1024).required(),
			email: Joi.string().regex(regex.EMAIL).required()
		})
	);
	return userSchema.validate(reqBody);
};

const signUpApiValidation = (reqBody: any) => {
	const schema = Joi.object({
		'email': Joi.string().regex(regex.EMAIL).required(),
		'mobile': Joi.string().regex(regex.PHONE).required(),
		'name': Joi.string().strict().trim().min(3).max(50).regex(regex.NAME).required(),
		'role': Joi.string().strict().trim().min(3).max(50),
		'password': Joi.string().strict().trim().min(6).max(20).regex(regex.PASSWORD).required()
	});
	return schema.validate(reqBody);
};

const forgetPasswordApiValidation = (reqBody: any) => {
	const schema = Joi.object({
		'email': Joi.string().regex(regex.EMAIL),
		'mobile': Joi.string().regex(regex.PHONE)
	});
	return schema.validate(reqBody);
};

const validateOTPApiValidation = (reqBody: any) => {
	const schema = Joi.object({
		'email': Joi.string().regex(regex.EMAIL),
		'mobile': Joi.string().min(10).max(13).regex(regex.PHONE),
		'otp': Joi.string().min(6).max(6).regex(regex.OTP).required()
	});
	return schema.validate(reqBody);
};

const changePasswordApiValidation = (reqBody: any) => {
	const schema = Joi.object({
		'email': Joi.string().regex(regex.EMAIL),
		'mobile': Joi.string().min(10).max(13).regex(regex.PHONE),
		'temp_id': Joi.string().min(8).max(12).required(),
		'newPass': Joi.string().min(8).max(1024).regex(regex.PASSWORD).required()
	});
	return schema.validate(reqBody);
};

export { tokenApiValidation, signUpApiValidation, forgetPasswordApiValidation, validateOTPApiValidation, changePasswordApiValidation };
