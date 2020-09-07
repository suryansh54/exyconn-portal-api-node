import { NextFunction } from 'express';

const mongoose = require('mongoose');
import { userModel } from '../dbModals/user';


const expenseSchema = new mongoose.Schema({
  expenseDate: {
    type: String,
  },
  paymentThrough: {
    type: String
  },
  // expenseDestination: {
  //   type: String,
  // },
  expenseMode: {
    type: String
  },
  expenseAmount: {
    type: String
  },
  expenseAddedBy: Array,
  expenseStatus: {
    type: Number
  },
  expenseType: {
    type: String
  },
  expenseName: {
    type: String
  },
  expenseDescription: {
    type: String
  },
  transactionId: {
    type: String
  },
  expenseConfirm: {
    type: Boolean
  }
});

// pre middleware


expenseSchema.pre('save', async function(this: any, next: NextFunction) {
    const expenseAddedPromises = this.expenseAddedBy.map(async (id: any) => await userModel.findById(id).select('-_id -__v -password -created_at'));
    this.expenseAddedBy = await Promise.all(expenseAddedPromises);
    next();
  });

const expense = mongoose.model('expense', expenseSchema);

export { expense };
