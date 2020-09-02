// Core Modules
import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';

// Utils
import { StatusMessages, Messages, StatusCode } from '../utils/enums/message';

const uploadReq: RequestHandler = async (req: any, res: any, next: NextFunction) => {
  if (!req.file) {
    return res.json({
      success: StatusMessages.ERROR,
      message: Messages.NO_FILE
    });
  } else {
    return res.json({
      success: StatusMessages.SUCCESS,
      message: Messages.FILE_UPLOADED,
      info: req.file
    });
  }
};

export { uploadReq };
