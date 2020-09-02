"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var otpMeathods = {
    get generateOTP() {
        var otpLength = 6;
        var digits = '0123456789';
        var otp = '';
        for (var i = 1; i <= otpLength; i++) {
            var index = Math.floor(Math.random() * (digits.length));
            otp = otp + digits[index];
        }
        return otp;
    }
};
exports.default = otpMeathods;
