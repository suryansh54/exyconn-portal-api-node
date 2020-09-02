"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var regex_1 = __importDefault(require("../utils/regex"));
var validate = {
    mobile: function (phone) {
        return regex_1.default.PHONE.test(phone);
    },
    email: function (email) {
        return regex_1.default.EMAIL.test(email);
    },
    otp: function (otp) {
        if (otp.length === 6) {
            return true;
        }
        else {
            return false;
        }
    },
    otpExpiry: function (expireTime) {
        if (Number(Date.now()) < Number(expireTime)) {
            return true;
        }
        else {
            return false;
        }
    },
    password: function (password) {
        if (password.length > 4) {
            return true;
        }
        else {
            return false;
        }
    },
    tempId: function (tempId) {
        if (tempId.length > 8 && tempId !== 'undefined') {
            return true;
        }
        else {
            return false;
        }
    }
};
exports.default = validate;
