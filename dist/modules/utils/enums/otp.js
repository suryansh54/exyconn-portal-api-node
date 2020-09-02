"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var otpCode;
(function (otpCode) {
    otpCode[otpCode["OTP_EXPIRED"] = 1] = "OTP_EXPIRED";
    otpCode[otpCode["OTP_NOT_MATCHED"] = 2] = "OTP_NOT_MATCHED";
    otpCode[otpCode["OTP_MATCHED"] = 3] = "OTP_MATCHED";
    otpCode[otpCode["FAILED"] = 4] = "FAILED";
    otpCode[otpCode["NO_OTP_FOUND"] = 5] = "NO_OTP_FOUND";
})(otpCode || (otpCode = {}));
exports.otpCode = otpCode;
