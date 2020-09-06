// core Modules
import { RequestHandler, Response, NextFunction } from 'express';

// Utils
import { Messages, StatusMessages, StatusCode } from '../utils/enums/message';

// Models
import { IncomeRequestModel, IncomeResponseModel, IncomeUpdateRequestModel } from '../modals/income';

// dbModels
import { income as Income } from '../dbModals/income';

// validationSchema

import { validateIncomeBody } from '../validations/reqBody';

const createIncomeRecord: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  if (userId) {
    const { error } = validateIncomeBody(req.body);
    if (error) {
      return res.status(StatusCode.BAD_REQUEST).json({
        status: StatusMessages.ERROR,
        message: error.details[0].message,
      });
    }
    const incomeRecord = new IncomeRequestModel(req.body, userId);
    const income = await Income.create(incomeRecord).then(() => {
      return res.status(StatusCode.CREATED).json({
        status: StatusMessages.SUCCESS,
        message: Messages.INCOME_CREATED
      });
    }).catch((err: any) => {
      return res.status(StatusCode.BAD_REQUEST).json({
        status: StatusMessages.ERROR,
        message: Messages.INCOME_CREATION_FAILED
      });
    });
  }
};

const getAllIncomeRecords: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  const UserId = req.userId;
  if (UserId) {
    await Income.find({}).select('-__v').then((records: any) => {
      const list: any = [];
      records.map((el: any) => {
        list.push(new IncomeResponseModel(el));
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

const getIncomeRecordById: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  const UserId =  req.userId;
  if (UserId) {
    const { incomeId } = req.params;
    if (incomeId) {
      await Income.findById(incomeId).select('-__v').then((record: any) => {
        const newRecord = new IncomeResponseModel(record);
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

const DeleteIncomeRecordById: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  const UserId =  req.userId;
  if (UserId) {
    const { incomeId } = req.params;
    if (incomeId) {
      const record = await Income.findOneAndRemove({_id: incomeId}).then(() => {
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

const editIncomeRecord: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  const UserId = req.userId;
  if (UserId) {
    const {  incomeId } = req.params;
    if (incomeId) {
      const updateReqBody = new IncomeUpdateRequestModel(req.body, UserId);
      await Income.findByIdAndUpdate(incomeId, updateReqBody ).select('-__v').then((record: any) => {
        const updatedRecord = new IncomeResponseModel(record);
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





export { createIncomeRecord, getAllIncomeRecords, getIncomeRecordById, DeleteIncomeRecordById, editIncomeRecord };
