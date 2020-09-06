class ExpenseResponseModel {
  [x: string]: any;
  constructor(res: any) {
    this.expenseId = res._id;
    this.expenseDate = res.expenseDate;
    this.expenseSource = res.expenseSource;
    this.paymentThrough = res.paymentThrough;
 //   this.expenseDestination = res.expenseDestination;
    this.expenseAmount = res.expenseAmount;
    this.expenseAddedBy = res.expenseAddedBy;
    this.expenseMode = res.expenseMode;
    this.expenseType = res.expenseType;
    this.expenseName = res.expenseName;
    this.expenseDescription = res.expenseDescription;
  }
}

class ExpenseRequestModel {
  [x: string]: any;
  constructor(req: any, userId: any) {
    this.expenseDate = req.expenseDate;
    this.expenseSource = req.expenseSource;
    this.paymentThrough = req.paymentThrough;
  //  this.expenseDestination = req.expenseDestination;
    this.expenseAmount = req.expenseAmount;
    this.expenseAddedBy = userId;
    this.expenseMode = req.expenseMode ? req.expenseMode : '';
    this.expenseType = req.expenseType;
    this.expenseName = req.expenseName;
    this.expenseDescription = req.expenseDescription ? req.expenseDescription : '';
  }
}

class ExpenseUpdateRequestModel {
  [x: string]: any;
  constructor(req: any, userId: any) {
    if (req.expenseName) {this.expenseName = req.expenseName; }
    if (req.expenseDate) { this.expenseDate = req.expenseDate; }
    if (req.expenseSource) { this.expenseSource = req.expenseSource; }
    if (req.paymentThrough) {this.paymentThrough = req.paymentThrough; }
   // if (req.expenseDestination) { this.expenseDestination = req.expenseDestination; }
    if (req.expenseAmount) { this.expenseAmount = req.expenseAmount; }
    this.expenseAddedBy = userId;
    if (req.expenseMode) { this.expenseMode = req.expenseMode; }
    if (req.expenseType) { this.expenseType = req.expenseType; }
    if (req.expenseDescription) { this.expenseDescription = req.expenseDescription; }
  }
}

export { ExpenseRequestModel, ExpenseResponseModel, ExpenseUpdateRequestModel };
