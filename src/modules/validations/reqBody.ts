const Joi = require('@hapi/joi');
import regex from '../utils/regex';

const validateFaqBody = (reqBody: any) => {
  const schema = Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
  });
  return schema.validate(reqBody);
};

const validateSubmitQueryBody = (reqBody: any) => {
  const schema = Joi.object({
    subject: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(reqBody);
};

const validateSubmitQueryByIdBody = (reqBody: any) => {
  const schema = Joi.object({
    incidentID: Joi.string().regex(regex.INCIDENTID).min(13).max(13).required(),
  });
  return schema.validate(reqBody);
};

const validateCreateAlternateNumberOTPBody = (reqBody: any) => {
  const schema = Joi.object({
    mobile: Joi.string().required(),
  });
  return schema.validate(reqBody);
};

const validateAlternateNumberOTPBody = (reqBody: any) => {
  const schema = Joi.object({
    otp: Joi.string().required(),
  });
  return schema.validate(reqBody);
};

const validateExpenseBody = (reqBody: any) => {
  const schema = Joi.object({
    expenseDate: Joi.string().required(),
    expenseDeductedFrom: Joi.string().required(),
    expenseDestination: Joi.string().required(),
    expenseAmount: Joi.string().required(),
  //  expenseMode: Joi.string().required(),
    expenseName: Joi.string().required(),
    expenseType: Joi.string().required()
  });
  return schema.validate(reqBody);
};



const validateIncomeBody = (reqBody: any) => {
  const schema = Joi.object({
    incomeDate: Joi.string().required(),
    incomeSource: Joi.string().required(),
    incomeDestination: Joi.string().required(),
  //  incomeMode: Joi.string().required(),
    incomeName: Joi.string().required(),
    incomeAmount: Joi.string().required(),
  });
  return schema.validate(reqBody);
};

export {
  validateFaqBody,
  validateSubmitQueryBody,
  validateSubmitQueryByIdBody,
  validateCreateAlternateNumberOTPBody,
  validateAlternateNumberOTPBody,
  validateIncomeBody,
  validateExpenseBody
};
