const bcrypt = require('bcryptjs');

// Core modules
import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';

// Utils
import { jwtTokenGenerate } from '../utils/token';
import otpMeathods from '../utils/otp';
import { sendPlainMail } from '../utils/mailer';
import tempID from '../utils/tempId';
import validate from '../utils/validate';
import { StatusMessages, Messages, StatusCode } from '../utils/enums/message';

// Modals
import { UserModels } from '../modals/user';

// Database Modals
import { userModel as User, OTPModel as OTP } from '../dbModals/user';

// Base modules
import { tokenApiValidation, signUpApiValidation, forgetPasswordApiValidation, validateOTPApiValidation, changePasswordApiValidation } from '../validations/auth';

let cmOTP: any = null;
const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	const { error } = tokenApiValidation(req.body);
	if (error) {
		return res.status(403).json({
			status: StatusMessages.ERROR,
			message: Messages.TOKEN_API_VALIDATION
		});
	} else {
		const { email, mobile, password } = req.body;
		let user;
		if (req.body.hasOwnProperty('email') && validate.email(email)) {
			user = await User.findOne({ email: email });
		} else if (req.body.hasOwnProperty('mobile') && validate.mobile(mobile)) {
			user = await User.findOne({ mobile: mobile });
		} else {
			user = null;
		}
		if (!user) {
			return res.status(StatusCode.UNAUTHORIZED).json({
				status: StatusMessages.ERROR,
				message: Messages.EMAIL_NOT_FOUND
			});
		} else {
			// Password is correct or not
			const validPassword = await bcrypt.compare(password, user.password);
			if (!validPassword) {
				return res.status(StatusCode.UNAUTHORIZED).json({
					status: StatusMessages.ERROR,
					message: Messages.INVALID_PASSWORD
				});
			} else {
				const payload = { _id: user._id, role: user.role };
				const token = jwtTokenGenerate(payload);
				return res.status(StatusCode.SUCCESS).json({
					status: StatusMessages.SUCCESS,
					message: Messages.SUCCESS_LOGIN,
					data: [{
						token: token,
						userRole: user.role,
						userName: user.name,
						userEmail: user.email
					}]
				});
			}
		}
	}
};

const signup: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	const { error } = signUpApiValidation(req.body);
	if (error) {
		return res.status(403).json({
			status: StatusMessages.ERROR,
			message: error.details[0].message
		});
	} else {
		const { email, mobile, role, password } = req.body;
		const userEmailExist = await User.findOne({ email: email });
		const userMobileExist = await User.findOne({ mobile: mobile });
		if (userEmailExist) {
			return res.status(400).json({
				status: StatusMessages.ERROR,
				message: Messages.EMAIL_EXISTS
			});
		} else if (userMobileExist) {
			return res.status(400).json({
				status: StatusMessages.ERROR,
				message: Messages.MOBILE_EXISTS
			});
		} else {
			// Encrypt password
			const encryptPass = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(password, encryptPass);

			// Create an user
			const user = new User({
				name: req.body.name,
				email: email,
				mobile: mobile,
				password: hashPassword,
				role: role || 'basic',
				created_at: Date.now(),
			});

			try {
				const addedUser = await user.save();
				const userUpdated = new UserModels(addedUser);
				return res.status(200).json({
					status: StatusMessages.SUCCESS,
					message: Messages.USER_CREATED,
					data: [{ user: userUpdated }]
				});
			} catch (error) {
				return res.status(400).json({
					status: StatusMessages.ERROR,
					message: Messages.NEW_USER_REG_FAIL,
					error: error
				});
			}
		}
	}
};

const forgotPassword: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	const { error } = forgetPasswordApiValidation(req.body);
	if (error) {
		return res.status(403).json({
			status: StatusMessages.ERROR,
			message: error.details[0].message
		});
	} else {
		const { email, mobile } = req.body;
		if (validate.mobile(mobile)) {
			const userMobileExist = await User.findOne({ mobile: mobile });
			if (userMobileExist) {
				await OTP.findOneAndRemove({ mobile: mobile });
				const newOTP = String(otpMeathods.generateOTP);
				// Create an user
				const saveOtp = new OTP({
					mobile: mobile,
					id: userMobileExist._id,
					otp: newOTP,
					creationDate: Date.now(),
					expiryDate: Date.now(),
				});
				try {
					await saveOtp.save();
				} catch (error) {
					res.status(400).json({
						status: StatusMessages.ERROR,
						message: error
					});
				}
				return res.status(200).json({
					status: StatusMessages.SUCCESS,
					message: `${Messages.OTP_SENT_TO_MOBILE} ${userMobileExist.mobile}`,
					data: [{
						mobile: mobile
					}]
				});
			} else {
				return res.status(401).json({
					status: StatusMessages.ERROR,
					message: Messages.MOBILE_NOT_IN_DB
				});
			}
		} else if (validate.email(email)) {
			const userEmailExist = await User.findOne({ email: email });
			if (userEmailExist) {
				await OTP.findOneAndRemove({ email: email });
				const newOTP = String(otpMeathods.generateOTP);
				const saveOtp = new OTP({
					email: email,
					id: userEmailExist._id,
					otp: newOTP,
					creationDate: Date.now(),
					expiryDate: Date.now() + 600000,
				});
				try {
					const savedOtp = await saveOtp.save();
				} catch (error) {
					res.status(400).json({
						status: StatusMessages.ERROR,
						message: error
					});
				}
				sendPlainMail({
					from: process.env.MAILER_SENT_FROM,
					to: userEmailExist.email,
					subject: 'OTP for authentication NAT-Prot',
					text: `OTP for veification is ${newOTP}`,
				});

				cmOTP = newOTP;

				// res.status(200).send(`<h1 id="updatedOTP">${newOTP}</h1>`);
				return res.status(200).json({
					status: StatusMessages.SUCCESS,
					message: `${Messages.OTP_SENT_TO_EMAIL} ${userEmailExist.email}`,
					data: [{
						email: email
					}]
				});
			} else {
				return res.status(401).json({ status: StatusMessages.ERROR, message: Messages.EMAIL_NOT_IN_DB });
			}
		} else {
			return res.status(401).json({ status: StatusMessages.ERROR, message: Messages.INVALID_FORMAT });
		}
	}
};

const validateOTP: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	const { error } = validateOTPApiValidation(req.body);
	if (error) {
		return res.status(403).json({
			status: StatusMessages.ERROR,
			message: error.details[0].message
		});
	} else {
		const { otp, email, mobile } = req.body;
		if (email && validate.email(email) && validate.otp(otp)) {
			const getUserOTP = await OTP.findOne({ email: email });
			const getOTP = getUserOTP ? getUserOTP.otp : '';
			if (validate.otp(getOTP) && getOTP === otp) {
				if (validate.otpExpiry(getUserOTP.expiryDate)) {
					await OTP.findOneAndRemove({ email: email });
					const temp_Id = tempID();
					const resetPASS = new OTP({
						email: email,
						otp: getOTP,
						temp_id: temp_Id,
						creationDate: Date.now(),
						expiryDate: Date.now() + 300000,
					});
					try {
						await resetPASS.save();
					} catch (error) {
						return res.status(400).json({ status: StatusMessages.ERROR, message: error });
					}
					return res.status(200).json({ status: StatusMessages.SUCCESS, message: Messages.OTP_MATCHED, data: [{ email: email, temp_id: temp_Id }] });
				} else {
					return res.status(400).json({ status: StatusMessages.ERROR, message: Messages.OTP_EXPIRED});
				}
			} else {
				return res.status(400).json({ message: Messages.OTP_NOT_MATCHED, status: StatusMessages.ERROR });
			}
		} else if (mobile && validate.mobile(mobile) && validate.otp(otp)) {
			const getUserOTP = await OTP.findOne({ mobile: mobile });
			const getOTP = getUserOTP ? getUserOTP.otp : '';
			if (validate.otp(getOTP) && getOTP === otp) {
				if (validate.otpExpiry(getUserOTP.expiryDate)) {
					await OTP.findOneAndRemove({ mobile: mobile });
					const temp_Id = tempID();
					const resetPASS = new OTP({
						mobile: mobile,
						otp: getOTP,
						temp_id: temp_Id,
						creationDate: Date.now(),
						expiryDate: Date.now() + 300000,
					});
					try {
						await resetPASS.save();
					} catch (error) {
						return res.status(400).json({ status: StatusMessages.ERROR, message: error });
					}
					return res.status(200).json({ status: StatusMessages.SUCCESS, message: Messages.OTP_MATCHED, data: [{ mobile: mobile, temp_id: temp_Id }] });
				} else {
					return res.status(400).json({ status: StatusMessages.ERROR, message: Messages.OTP_EXPIRED });
				}
			} else {
				return res.status(400).json({ status: StatusMessages.ERROR, message: Messages.OTP_NOT_MATCHED });
			}

		} else {
			return res.status(400).json({ status: StatusMessages.ERROR, message: Messages.INVALID_OTP });
		}
	}
};

const changePassword: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	const { error } = changePasswordApiValidation(req.body);
	if (error) {
		return res.status(403).json({
			status: StatusMessages.ERROR,
			message: error.details[0].message
		});
	} else {
		const { email, mobile, temp_id, newPass } = req.body;
		if (
			email && temp_id &&
			validate.email(email) &&
			validate.password(newPass) &&
			validate.tempId(temp_id)
		) {
			const getUserTempInfo = await OTP.findOne({ email: email });
			if (getUserTempInfo) {
				if (
					getUserTempInfo.temp_id === temp_id &&
					validate.otpExpiry(getUserTempInfo.expiryDate)
				) {
					const encryptPass = await bcrypt.genSalt(10);
					const hashPassword = await bcrypt.hash(newPass, encryptPass);
					await User.findOneAndUpdate(
						{ email: email },
						{ password: hashPassword }
					);
					// await User.findOne({ email: email });
					await OTP.findOneAndRemove({ email: email });
					return res.status(200).json({ message: Messages.PASSWORD_CHANGED_SUCCESSFULLY, status: StatusMessages.SUCCESS });
				} else {
					return res.status(400).json({ message: Messages.OTP_EXPIRED, status: StatusMessages.ERROR });
				}
			} else {
				res.status(400).json({
					status: StatusMessages.ERROR,
					message: `No temp id found associated with ${email}`
				});
			}
		} else if (mobile && temp_id && validate.mobile(mobile) && validate.password(newPass) && validate.tempId(temp_id)) {
			const getUserTempInfo = await OTP.findOne({ mobile: mobile });
			if (getUserTempInfo) {
				if (getUserTempInfo.temp_id === temp_id && validate.otpExpiry(getUserTempInfo.expiryDate)) {
					const encryptPass = await bcrypt.genSalt(10);
					const hashPassword = await bcrypt.hash(newPass, encryptPass);
					await User.findOneAndUpdate({ mobile: mobile }, { password: hashPassword });
					// await User.findOne({ email: email });
					await OTP.findOneAndRemove({ mobile: mobile });
					return res.status(200).json({ status: StatusMessages.SUCCESS, message: Messages.PASSWORD_CHANGED_SUCCESSFULLY });
				} else {
					return res.status(400).json({ status: StatusMessages.ERROR, message: Messages.OTP_SESSION_EXPIRED });
				}
			} else {
				res.status(400).json({
					status: StatusMessages.ERROR,
					message: 'temp_id has been disabled please try again'
				});
			}
		} else {
			return res.status(400).json({ status: StatusMessages.ERROR, message: 'Data format does not match' });
		}
	}
};

const viewOTP: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	res.send(`<h1 id="viewOTP">${cmOTP}</h1>`);
};

export { login, signup, forgotPassword, validateOTP, changePassword, viewOTP };
