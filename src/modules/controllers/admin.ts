// Core modules
import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';

// Utils

import { Messages , StatusMessages, StatusCode } from '../utils/enums/message';

// Database Modals
import { userModel as User } from '../dbModals/user';
import { UserModels } from '../modals/user';

const userList: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const users = await User.find();
  const filteredUsers = users.map((user: any) => new UserModels(user));
  if (users.length > 0) {
    return res.status(200).json({
      status: StatusMessages.SUCCESS,
      message: Messages.ALL_USER_LIST,
      count: filteredUsers.length,
      data: filteredUsers
    });
  } else {
    return res.status(200).json({
      status: StatusMessages.ERROR,
      message: Messages.NO_USER_EXIST
    });
  }
};

const allUserDelete: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  await User.remove();
  return res.status(200).json({
    status: StatusMessages.SUCCESS,
    message: Messages.ALL_USER_DELETED
  });
};

export { userList, allUserDelete };
