class IncomeResponseModel {
  [x: string]: any;
  constructor(res: any) {
    this.incomeId = res._id;
    this.incomeDate = res.incomeDate;
    this.incomeSource = res.incomeSource;
    this.incomeDestination = res.incomeDestination;
    this.incomeAmount = res.incomeAmount;
    this.incomeAddedBy = res.incomeAddedBy;
    this.incomeMode = res.incomeMode;
    this.incomeName = res.incomeName;
    this.incomeDescription = res.incomeDescription;
  }
}

class IncomeRequestModel {
  [x: string]: any;
  constructor(req: any, userId: any) {
    this.incomeDate = req.incomeDate;
    this.incomeSource = req.incomeSource;
    this.incomeDestination = req.incomeDestination;
    this.incomeAmount = req.incomeAmount;
    this.incomeAddedBy = userId;
    this.incomeMode = req.incomeMode ? req.incomeMode : '';
    this.incomeName = req.incomeName;
    this.incomeDescription = req.incomeDescription ? req.incomeDescription : '';
  }
}

class IncomeUpdateRequestModel {
  [x: string]: any;
  constructor (req: any, userId: any) {
    if (req.incomeDate) { this.incomeDate = req.incomeDate; }
    if (req.incomeSource) { this.incomeSource = req.incomeSource; }
    if (req.incomeDestination) { this.incomeDestination = req.incomeDestination; }
    if (req.incomeAmount) { this.incomeAmount = req.incomeAmount; }
    this.incomeAddedBy = userId;
    if (req.incomeMode) { this.incomeMode = req.incomeMode; }
    if (req.incomeName) { this.incomeName = req.incomeName; }
    if (req.incomeDescription) {
      this.incomeDescription = req.incomeDescription;
    }
  }
}

export { IncomeRequestModel, IncomeResponseModel, IncomeUpdateRequestModel };
