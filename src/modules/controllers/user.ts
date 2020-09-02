const bcrypt = require('bcryptjs');

// Core Modules
import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';

// Utils
import { StatusMessages, Messages, StatusCode } from '../utils/enums/message';

// Database Modals
import { userModel as User } from '../dbModals/user';

// Model
import { UserModels, UserUpdate } from '../modals/user';
import { validatePasswordApiValidation, validateUpdateBodyRequest, validatePasswordWhileUpdating } from '../validations/user';


const getUser: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
	const userId = req.userId;
	if (userId) {
		const user = await User.findOne({ _id: userId });
		if (user) {
			const userData = new UserModels(user);
			return res.status(200).json({
				status: StatusMessages.SUCCESS,
				message: Messages.USER_DATA,
				data: [userData]
			});
		} else {
			return res.status(400).json({
				status: StatusMessages.ERROR,
				message: Messages.UNABLE_TO_SEND_USER_DATA,
			});
		}
	}
};

const deleteUser: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
	const userId = req.userId;
	if (userId) {
		const user = await User.findOneAndRemove({ _id: userId });
		if (user) {
			const userData = new UserModels(user);
			return res.status(200).json({
				status: StatusMessages.SUCCESS,
				message: Messages.USER_DELETED_SUCCESSFULLY,
				data: [userData]
			});
		} else {
			return res.status(400).json({
				status: StatusMessages.ERROR,
				message: Messages.UNABLE_TO_DELETE_USER,
			});
		}
	}
};

const updateUser: RequestHandler = async (req: any, res: Response, next: NextFunction) => {

	const userID = req.userId;
	const userReqBody = new UserUpdate(req.body);
	// delete req.body.created_at;
	// delete req.body.updated_at;
	// delete req.body.deleted_at;
	// delete req.body.password;
	// delete req.body.role;
	const { error } = validateUpdateBodyRequest(userReqBody);
	if (error) {
		return res.status(403).json({
			status: StatusMessages.ERROR,
			message: error.details[0].message
		});
	}
	if (userID) {
		const user = await User.findOneAndUpdate({ _id: userID }, { ...userReqBody, updated_at: Date.now() });
		if (user) {
			const userData = new UserModels(user);
			return res.status(200).json({
				status: StatusMessages.SUCCESS,
				message: Messages.USER_UPDATED_SUCCESSFULLY,
				data: [userReqBody]
			});
		} else {
			return res.status(400).json({
				status: StatusMessages.ERROR,
				message: Messages.UNABLE_TO_USER_UPDATE
			});
		}
	}
};

const validatePassword: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
	const { error } = validatePasswordApiValidation(req.body);
	if (error) {
		return res.status(403).json({
			status: StatusMessages.ERROR,
			message: error.details[0].message
		});
	} else {
		const { password } = req.body;
		const userId = req.userId;
		if (userId) {
			const user = await User.findOne({ _id: userId });
			const validPassword = await bcrypt.compare(password, user.password);
			if (!validPassword) {
				return res.status(400).json({
					status: StatusMessages.ERROR,
					message: Messages.INVALID_PASSWORD,
					data: [{ userVerified: false }]
				});
			} else {
				return res.status(200).json({
					status: StatusMessages.SUCCESS,
					message: Messages.USER_VERIFIED,
					data: [{ userVerified: true }]
				});
			}
		}
	}
};
// Update the password new
const updatePassword: RequestHandler = async (req: any, res: Response, next: NextFunction) => {
	const userID = req.userId;
	// Password is correct or not
	const { error } = validatePasswordWhileUpdating(req.body);
	if (error) {
		return res.status(403).json({
			status: StatusMessages.ERROR,
			message: error.details[0].message
		});
	} else {
		const { password, newPassword } = req.body;
		const user = await User.findOne({ _id: userID });
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(StatusCode.UNAUTHORIZED).json({
				status: StatusMessages.ERROR,
				message: Messages.INVALID_PASSWORD
			});
		} else {
			const encryptPass = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(newPassword, encryptPass);
			const updatedUser = await User.findOneAndUpdate({ _id: userID }, { password: hashPassword, updated_at: Date.now() });
			if (updatedUser) {
				return res.status(200).json({
					status: StatusMessages.SUCCESS,
					message: Messages.PASS_CHANGED_SUCCESS
				});
			} else {
				return res.status(400).json({
					status: StatusMessages.ERROR,
					message: Messages.UNABLE_TO_USER_UPDATE
				});
			}
		}
	}
};
export { getUser, deleteUser, updateUser, validatePassword, updatePassword };
