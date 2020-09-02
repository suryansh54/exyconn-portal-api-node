const otpMeathods = {
  get generateOTP() { // 6 Digit OTP generate
    const otpLength = 6;
    const digits = '0123456789';
    let otp = '';
    for (let i = 1; i <= otpLength; i++) {
        const index = Math.floor(Math.random() * (digits.length));
        otp = otp + digits[index];
    }
    return otp;
  }
};

export default otpMeathods;
