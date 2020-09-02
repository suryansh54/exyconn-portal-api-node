
import { OTPModel as OTP } from '../dbModals/user';
import otpMeathods from '../utils/otp';
import { sendPlainMail } from '../utils/mailer';
import { otpCode } from '../utils/enums/otp';
import mongoose from 'mongoose';



/**
 * @params {email} string
 * @params {number} number
 * @params {id} userID
 * @return Promise
*/

const ObjectID = mongoose.Types.ObjectId;

const otpCreation: any = async (email: string, number: Number, id: any) => {
  if (ObjectID.isValid(id)) {
    const newOTP = String(otpMeathods.generateOTP);
    await OTP.deleteMany({id: id});
  const saveOtp = await OTP.create({
    mobile: number,
    id: id,
    otp: newOTP,
    creationDate: Date.now(),
    expiryDate: Date.now() + 600000,
  });
  if (saveOtp) {
      sendPlainMail({
      from: process.env.MAILER_SENT_FROM,
      to: email,
      subject: 'OTP for authentication NAT-Prot',
      text: `OTP for veification is ${newOTP}`,
    });
    return true;
  } else {
    return false;
  }
  } else {
    console.error('User ID not valid');
  }
};

/**
 * @params {id} string
 * @params {otp} string
 * @return Promise
*/

const otpValidation: any = async (id: any, otp: any) => {
  if (ObjectID.isValid(id)) {
    const savedOtp = await OTP.findOne({id: id});
    if (savedOtp) {
      if ( Date.now() >= savedOtp.expiryDate) {
        return  {code: otpCode.OTP_EXPIRED};
      }
      if (otp === savedOtp.otp) {
        await  OTP.deleteMany({id: id});
        return {code: otpCode.OTP_MATCHED, number: savedOtp.mobile};
      }
      if (otp !== savedOtp.otp) {
        return  {code: otpCode.OTP_NOT_MATCHED};
      }
      return {code: otpCode.FAILED, number: savedOtp.mobile};
    } else {
     return {code: otpCode.NO_OTP_FOUND};
    }
  } else {
    console.error('User ID not valid');
  }
};

export { otpCreation, otpValidation };
