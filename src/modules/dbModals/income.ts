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
    type: String
  },
  incomeDescription: {
    type: String
  }
});

const income = mongoose.model('income', incomeSchema);

export { income };
