const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* User */
const userSchema = new Schema({
	name: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		trim: true
	},
	mobile: {
		type: String,
		unique: true,
		trim: true
	},
	alternate_no : {
		type: String,
		// unique: true,
		// trim: true
	},
	password: {
		type: String,
		trim: true,
		password: [true, 'Password is required']
	},
	role: {
		type: String,
		default: 'basic',
		enum: ['basic', 'admin']
	},
	created_at: {
		type: String,
		unique: true,
		trim: true
	},
	updated_at: {
		type: String,
		trim: true
	},
	deleted_at: {
		type: String,
		trim: true
	}
});
const userModel: any = mongoose.model('User', userSchema);

/* OTP */
const OTPSchema = new Schema({
	temp_id: String,
	email: String,
	id: String,
	mobile: String,
	otp: String,
	creationDate: String,
	expiryDate: String
});
const OTPModel: any = mongoose.model('Otp', OTPSchema);

export { userModel, OTPModel };
