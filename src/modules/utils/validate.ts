import regex from '../utils/regex';

const validate = {
	mobile: (phone: string) => { // Validates the phone number
		return regex.PHONE.test(phone);
	},
	email: (email: string) => { // Validates the email address
		return regex.EMAIL.test(email);
	},
	otp: (otp: string) => { // Validates OTP
		if (otp.length === 6) {
			return true;
		} else {
			return false;
		}
	},
	otpExpiry: (expireTime: string) => { // validates otp expiry time
		if (Number(Date.now()) < Number(expireTime)) {
			return true;
		} else {
			return false;
		}
	},
	password: (password: string) => { // validates otp expiry time
		if (password.length > 4) {
			return true;
		} else {
			return false;
		}
	},
	tempId: (tempId: string) => { // validates otp expiry time
		if (tempId.length > 8 && tempId !== 'undefined') {
			return true;
		} else {
			return false;
		}
	}
};

export default validate;
