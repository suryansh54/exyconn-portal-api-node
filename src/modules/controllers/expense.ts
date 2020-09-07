// core Modules
import { RequestHandler, Response, NextFunction } from 'express';

// Utils
import { Messages, StatusMessages, StatusCode } from '../utils/enums/message';

// Models
import { ExpenseRequestModel, ExpenseResponseModel, ExpenseUpdateRequestModel } from '../modals/expense';

// dbModels
import { expense as Expense } from '../dbModals/expense';

// validationSchema

import { validateExpenseBody } from '../validations/reqBody';

const createExpenseRecord: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  if (userId) {
    const { error } = validateExpenseBody(req.body);
    if (error) {
      return res.status(StatusCode.BAD_REQUEST).json({
        status: StatusMessages.ERROR,
        message: error.details[0].message,
      });
    }
    const expenseRecord = new ExpenseRequestModel(req.body, userId);
    const expense = await Expense.create(expenseRecord).then(() => {
      return res.status(StatusCode.CREATED).json({
        status: StatusMessages.SUCCESS,
        message: Messages.EXPENSE_CREATED
      });
    }).catch((err: any) => {
      return res.status(StatusCode.BAD_REQUEST).json({
        status: StatusMessages.ERROR,
        message: Messages.EXPENSE_CREATION_FAILED,
        data: [err]
      });
    });
  }
};

const getAllExpenseRecords: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  const UserId = req.userId;
  if (UserId) {
    await Expense.find({}).select('-__v').then((records: any) => {
      const list: any = [];
      records.map((el: any) => {
        list.push(new ExpenseResponseModel(el));
      });
      return res.status(StatusCode.SUCCESS).json({
        status: StatusMessages.SUCCESS,
        message: Messages.RECORD_FOUND,
        data: list
      });
    }).catch((err: any) => {
      return res.status(StatusCode.NOT_FOUND).json({
        status: StatusMessages.ERROR,
        message: Messages.NO_RECORD_FOUND
      });
    });
  }
};

const getExpenseRecordById: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  const UserId =  req.userId;
  if (UserId) {
    const { expenseId } = req.params;
    if (expenseId) {
      await Expense.findById(expenseId).select('-__v').then((record: any) => {
        const newRecord = new ExpenseResponseModel(record);
        return res.status(StatusCode.SUCCESS).json({
          status: StatusMessages.SUCCESS,
          message: Messages.SINGLE_RECORD_FOUND,
          data: [newRecord]
        });
      }).catch((err: any) => {
        return res.status(StatusCode.NOT_FOUND).json({
          status: StatusMessages.ERROR,
          message: Messages.NO_RECORD_FOUND
        });
      });
    } else {
      return res.status(StatusCode.BAD_REQUEST).json({
        status: StatusMessages.ERROR,
        message: Messages.NO_REQUEST_BODY
      });
    }
  }
};

const DeleteExpenseRecordById: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  const UserId =  req.userId;
  if (UserId) {
    const { expenseId } = req.params;
    if (expenseId) {
      const record = await Expense.findOneAndRemove({_id: expenseId}).then(() => {
        return res.status(StatusCode.SUCCESS).json({
          status: StatusMessages.SUCCESS,
          message: Messages.RECORD_DELETED,
        });
      }).catch((err: any) => {
        return res.status(StatusCode.NOT_FOUND).json({
          status: StatusMessages.ERROR,
          message: Messages.NO_RECORD_FOUND,
        });
      });
    } else {
      return res.status(StatusCode.BAD_REQUEST).json({
        status: StatusMessages.ERROR,
        message: Messages.NO_REQUEST_BODY
      });
    }
  }
};

const editExpenseRecord: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  const UserId = req.userId;
  if (UserId) {
    const { expenseId } = req.params;
    if (expenseId) {
      const updateReqBody = new ExpenseUpdateRequestModel(req.body, UserId);
      await Expense.findByIdAndUpdate(expenseId, updateReqBody).then((record: any) => {
        const updatedRecord = new ExpenseResponseModel(record);
        return res.status(StatusCode.SUCCESS).json({
          status: StatusMessages.SUCCESS,
          message: Messages.RECORD_UPDATED,
          data: [updatedRecord]
        });
      }).catch((err: any) => {
        return res.status(StatusCode.NOT_FOUND).json({
          status: StatusMessages.ERROR,
          message: Messages.NO_RECORD_FOUND
        });
      });
    } else {
      return res.status(StatusCode.BAD_REQUEST).json({
        status: StatusMessages.ERROR,
        message: Messages.NO_REQUEST_BODY
      });
    }
  }
};





export { createExpenseRecord, getAllExpenseRecords, getExpenseRecordById, DeleteExpenseRecordById, editExpenseRecord };
