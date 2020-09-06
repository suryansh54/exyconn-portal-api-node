const mongoose = require('mongoose');
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
  expenseAddedBy: {
    type: String
  },
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
  }
});

const expense = mongoose.model('expense', expenseSchema);

export { expense };
