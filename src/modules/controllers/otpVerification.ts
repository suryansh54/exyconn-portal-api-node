import { RequestHandler, NextFunction, Response } from 'express';
import { userModel as User, OTPModel as OTP } from '../dbModals/user';
import { Messages, StatusCode, StatusMessages } from '../utils/enums/message';
import { otpValidation, otpCreation } from '../utils/otpVerification';
import validate from '../utils/validate';

const createAlternateNumberOTP: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  const userID = req.userId;
  if (userID) {
    const { mobile } = req.body;
    if (validate.mobile(mobile)) {
      const user = await User.findOne({_id: userID});
      if (mobile !== user.mobile) {
        const otpCreated = await otpCreation(user.email, mobile, userID);
        if (otpCreated) {
          res.status(StatusCode.SUCCESS).json({
            status: StatusMessages.SUCCESS,
            message: `${Messages.OTP_SENT_TO_EMAIL} ${user.email}`,
          });
        } else {
          res.status(400).json({
            status: StatusMessages.ERROR,
            message: Messages.OTP_NOT_SENT
          });
        }
      } else {
        res.status(400).json({
          status: StatusMessages.ERROR,
          message: Messages.SAME_MOBILE_NUMBER
        });
      }
    } else {
      res.status(400).json({
        status: StatusMessages.ERROR,
        message: Messages.INVALID_NUMBER
      });
    }
  }
};

const validateAlternateNumberOTP: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
  const userID = req.userId;
  if (userID) {
    const { otp } = req.body;
    const result = await otpValidation(userID, otp);
    if (result.code === 1) {
      await  OTP.deleteMany({id: userID});
      res.status(400).json({
        status: StatusMessages.ERROR,
        message: Messages.OTP_EXPIRED
      });
    }
    if (result.code === 2) {
      res.status(400).json({
        status: StatusMessages.ERROR,
        message: Messages.OTP_NOT_MATCHED
      });
    }
    if (result.code === 3) {
      const user = await User.findOneAndUpdate({_id: userID}, {alternate_no: result.number});
      await user.save();
      res.status(200).json({
        status: StatusMessages.SUCCESS,
        message: Messages.OTP_MATCHED
      });
    }
    if (result.code === 4) {
      res.status(200).json({
        status: StatusMessages.ERROR,
        message: Messages.FAILED_OTP_VERIFICATION
      });
    }
    if (result.code === 5) {
      res.status(StatusCode.NOT_FOUND).json({
        status: StatusMessages.ERROR,
        mesage: Messages.INVALID_OTP
      });
    }
  }
};

export { createAlternateNumberOTP, validateAlternateNumberOTP };
