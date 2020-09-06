// core Modules
import { Response, NextFunction } from 'express';
import { RequestHandler } from 'express';

// Utils
import { Messages, StatusMessages } from '../utils/enums/message';
const APIFeatures = require('../utils/apiFeatures');

// dbModel
import { contactQuery as ContactQuery } from '../dbModals/contact';

// model
import {
  ContactQueryModel,
  ContactQueryResponseModel,
  ReqContactQueryModel,
} from '../modals/contact';
import {
  validateSubmitQueryBody,
  validateSubmitQueryByIdBody,
} from '../validations/reqBody';
import validate from '../utils/validate';

// controller functions

const submitContactQuery: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  if (userId) {
    const { error } = validateSubmitQueryBody(req.body);
    if (error) {
      res.status(400).json({
        status: StatusMessages.ERROR,
        error: error.details[0].message,
      });
    } else {
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
  }
};

const getContactQueryById: RequestHandler = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId;
  if (userId) {
    const { error } = validateSubmitQueryByIdBody(req.body);
    if (error) {
      res.status(400).json({
        status: StatusMessages.ERROR,
        message: error.details[0].message,
      });
    } else {
      const { incidentID } = req.body;
      const contactQuery = await ContactQuery.findOne({
        incidentID: incidentID,
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
          message: Messages.INVALID_INCIDENT_ID,
        });
      }
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
    if (req.query.page * 1 <= 0) {
      req.query.page = 1;
    }
    const queryParams = {
      page: req.query.page * 1 || 1,
      limit: req.query.limit * 1 || 10,
    };
    const contactQueryList = await ContactQuery.find({ userID: userId });
    const apiFeatures = new APIFeatures(
      ContactQuery.find({ userID: userId }),
      queryParams
    ).paginate();
    const contactQueryList2 = await apiFeatures.query.select('-_id -__v');
    const list: any = [];
    contactQueryList2.map((el: any) => {
      list.push(new ContactQueryResponseModel(el));
    });
    if (contactQueryList) {
      return res.status(200).json({
        status: StatusMessages.SUCCESS,
        message: Messages.LIST_EXTRACTED,
        data: {
          number_of_pages: Math.ceil(
            contactQueryList.length / queryParams.limit
          ),
          page_number: queryParams.page,
          number_of_items_per_page: queryParams.limit,
          data: list,
        },
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
