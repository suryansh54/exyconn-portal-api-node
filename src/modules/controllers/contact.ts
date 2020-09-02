// core Modules
import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';

// Utils
import { Messages, StatusMessages } from '../utils/enums/message';

// dbModel
import { contactQuery as ContactQuery } from '../dbModals/contact';

// model
import {
  ContactQueryModel,
  ContactQueryResponseModel,
  ReqContactQueryModel,
} from '../modals/contact';

// controller functions

const submitContactQuery: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  if (userId) {
    const { subject, description } = req.body;

    const newContactQuery = new ReqContactQueryModel({
      subject: subject,
      description: description,
      userID: userId,
      incidentID: Date.now(),
    });
    const saveNewContactQuery = await ContactQuery.create(newContactQuery);
    if (saveNewContactQuery) {
      const query = new ContactQueryModel(saveNewContactQuery);
      return res.status(201).json({
        status: StatusMessages.SUCCESS,
        message: Messages.QUERY_SUBMITTED,
        data: [query],
      });
    } else {
      res.status(400).json({
        status: StatusMessages.ERROR,
        messege: Messages.UNABLE_TO_CREATE_QUERY,
      });
    }
  }
};

const getContactQueryById: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  if (userId) {
    const contactQuery = await ContactQuery.findOne({
      incidentID: req.body.incidentID,
      userID: userId,
    });
    if (contactQuery) {
      const resContactQuery = new ContactQueryResponseModel(contactQuery);
      return res.status(200).json({
        status: StatusMessages.SUCCESS,
        message: Messages.QUERY_FOUND,
        data: [resContactQuery],
      });
    } else {
      res.status(400).json({
        status: StatusMessages.ERROR,
        message: Messages.INVALID_INCIDENT_ID
      });
    }
  }
};

const getContactQueryList: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  if (userId) {
    const contactQueryList = await ContactQuery.find({ userID: userId }).select('-_id -__v');
    const list: any = [];
    contactQueryList.map((el: any) => {
      list.push(new ContactQueryResponseModel(el));
    });
    if (contactQueryList) {
      return res.status(200).json({
        status: StatusMessages.SUCCESS,
        message: Messages.LIST_EXTRACTED,
        data: list,
      });
    } else {
      return res.status(404).json({
        status: StatusMessages.ERROR,
        messege: Messages.NO_QUERY_EXIST,
      });
    }
  }
};

export { submitContactQuery, getContactQueryList, getContactQueryById };
