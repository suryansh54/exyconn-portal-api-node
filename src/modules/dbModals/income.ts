import { NextFunction } from 'express';
import { userModel } from './user';

const mongoose = require('mongoose');
const incomeSchema = new mongoose.Schema({
  incomeDate: {
    type: String,
  },
  incomeName: {
    type: String
  },
  incomeSource: {
    type: String
  },
  incomeDestination: {
    type: String,
  },
  incomeMode: {
    type: String
  },
  incomeAmount: {
    type: String
  },
  incomeAddedBy: {
    type: Array
  },
  incomeDescription: {
    type: String
  },
  transactionId: {
    type: String
  },
  incomeConfirm: {
    type: Boolean
  }
});

// pre Middleware

incomeSchema.pre('save', async function(this: any, next: NextFunction) {
  const incomeAddedPromises = this.incomeAddedBy.map(async (id: any) => await userModel.findById(id).select('-_id -__v -password -created_at'));
  this.incomeAddedBy = await Promise.all(incomeAddedPromises);
  next();
});

const income = mongoose.model('income', incomeSchema);

export { income };
