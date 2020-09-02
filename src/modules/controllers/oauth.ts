// Core modules
import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';

// Utils
import { jwtTokenGenerate } from '../utils/token';
import { StatusMessages, Messages, StatusCode } from '../utils/enums/message';

// Database Modals
import { userModel as User, OTPModel as OTP } from '../dbModals/user';

const oAuthGoogle: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { profileObj } = req.body;
  const userEmail = profileObj.email;
  if (userEmail) {
    const user = await User.findOne({ email: userEmail });
    if (user) {
      const payload = { _id: user._id };
      const token = jwtTokenGenerate(payload);
      return res.header('auth-token', token).status(200).json({
        status: StatusMessages.SUCCESS,
        message: Messages.USER_LOGGED_IN_VIA_GOOGLE,
        data: [{
          token: token,
          userName: user.name,
          userEmail: user.email,
        }]
      });
    } else {
      return res.status(400).json({
        status: StatusMessages.ERROR,
        message: Messages.NO_USER_EXIST,
      });
    }
  }
};

const oAuthFacebook: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (email) {
    const user = await User.findOne({ email: email });
    if (user) {
      const payload = { _id: user._id };
      const token = jwtTokenGenerate(payload);
      return res.header('auth-token', token).status(200).json({
        status: StatusMessages.SUCCESS,
        message: Messages.USER_LOGGED_IN_VIA_FACEBOOK,
        data: [{
          token: token,
          userName: user.name,
          userEmail: user.email,
        }]
      });
    } else {
      return res.status(400).json({
        status: StatusMessages.ERROR,
        message: Messages.NO_USER_EXIST,
      });
    }
  }
};

export { oAuthGoogle, oAuthFacebook };
