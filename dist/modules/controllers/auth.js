"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require('bcryptjs');
// Utils
var token_1 = require("../utils/token");
var otp_1 = __importDefault(require("../utils/otp"));
var mailer_1 = require("../utils/mailer");
var tempId_1 = __importDefault(require("../utils/tempId"));
var validate_1 = __importDefault(require("../utils/validate"));
var message_1 = require("../utils/enums/message");
// Modals
var user_1 = require("../modals/user");
// Database Modals
var user_2 = require("../dbModals/user");
// Base modules
var auth_1 = require("../validations/auth");
var cmOTP = null;
var login = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error, _a, email, mobile, password, user, validPassword, payload, token;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                error = auth_1.tokenApiValidation(req.body).error;
                if (!error) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(403).json({
                        status: message_1.StatusMessages.ERROR,
                        message: message_1.Messages.TOKEN_API_VALIDATION
                    })];
            case 1:
                _a = req.body, email = _a.email, mobile = _a.mobile, password = _a.password;
                user = void 0;
                if (!(req.body.hasOwnProperty('email') && validate_1.default.email(email))) return [3 /*break*/, 3];
                return [4 /*yield*/, user_2.userModel.findOne({ email: email })];
            case 2:
                user = _b.sent();
                return [3 /*break*/, 6];
            case 3:
                if (!(req.body.hasOwnProperty('mobile') && validate_1.default.mobile(mobile))) return [3 /*break*/, 5];
                return [4 /*yield*/, user_2.userModel.findOne({ mobile: mobile })];
            case 4:
                user = _b.sent();
                return [3 /*break*/, 6];
            case 5:
                user = null;
                _b.label = 6;
            case 6:
                if (!!user) return [3 /*break*/, 7];
                return [2 /*return*/, res.status(message_1.StatusCode.UNAUTHORIZED).json({
                        status: message_1.StatusMessages.ERROR,
                        message: message_1.Messages.EMAIL_NOT_FOUND
                    })];
            case 7: return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 8:
                validPassword = _b.sent();
                if (!validPassword) {
                    return [2 /*return*/, res.status(message_1.StatusCode.UNAUTHORIZED).json({
                            status: message_1.StatusMessages.ERROR,
                            message: message_1.Messages.INVALID_PASSWORD
                        })];
                }
                else {
                    payload = { _id: user._id, role: user.role };
                    token = token_1.jwtTokenGenerate(payload);
                    return [2 /*return*/, res.status(message_1.StatusCode.SUCCESS).json({
                            status: message_1.StatusMessages.SUCCESS,
                            message: message_1.Messages.SUCCESS_LOGIN,
                            data: [{
                                    token: token,
                                    userRole: user.role,
                                    userName: user.name,
                                    userEmail: user.email
                                }]
                        })];
                }
                _b.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var signup = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error, _a, email, mobile, role, password, userEmailExist, userMobileExist, encryptPass, hashPassword, user, addedUser, userUpdated, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                error = auth_1.signUpApiValidation(req.body).error;
                if (!error) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(403).json({
                        status: message_1.StatusMessages.ERROR,
                        message: error.details[0].message
                    })];
            case 1:
                _a = req.body, email = _a.email, mobile = _a.mobile, role = _a.role, password = _a.password;
                return [4 /*yield*/, user_2.userModel.findOne({ email: email })];
            case 2:
                userEmailExist = _b.sent();
                return [4 /*yield*/, user_2.userModel.findOne({ mobile: mobile })];
            case 3:
                userMobileExist = _b.sent();
                if (!userEmailExist) return [3 /*break*/, 4];
                return [2 /*return*/, res.status(400).json({
                        status: message_1.StatusMessages.ERROR,
                        message: message_1.Messages.EMAIL_EXISTS
                    })];
            case 4:
                if (!userMobileExist) return [3 /*break*/, 5];
                return [2 /*return*/, res.status(400).json({
                        status: message_1.StatusMessages.ERROR,
                        message: message_1.Messages.MOBILE_EXISTS
                    })];
            case 5: return [4 /*yield*/, bcrypt.genSalt(10)];
            case 6:
                encryptPass = _b.sent();
                return [4 /*yield*/, bcrypt.hash(password, encryptPass)];
            case 7:
                hashPassword = _b.sent();
                user = new user_2.userModel({
                    name: req.body.name,
                    email: email,
                    mobile: mobile,
                    password: hashPassword,
                    role: role || 'basic',
                    created_at: Date.now(),
                });
                _b.label = 8;
            case 8:
                _b.trys.push([8, 10, , 11]);
                return [4 /*yield*/, user.save()];
            case 9:
                addedUser = _b.sent();
                userUpdated = new user_1.UserModels(addedUser);
                return [2 /*return*/, res.status(200).json({
                        status: message_1.StatusMessages.SUCCESS,
                        message: message_1.Messages.USER_CREATED,
                        data: [{ user: userUpdated }]
                    })];
            case 10:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(400).json({
                        status: message_1.StatusMessages.ERROR,
                        message: message_1.Messages.NEW_USER_REG_FAIL
                    })];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.signup = signup;
var forgotPassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error, _a, email, mobile, userMobileExist, newOTP, saveOtp, error_2, userEmailExist, newOTP, saveOtp, savedOtp, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                error = auth_1.forgetPasswordApiValidation(req.body).error;
                if (!error) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(403).json({
                        status: message_1.StatusMessages.ERROR,
                        message: error.details[0].message
                    })];
            case 1:
                _a = req.body, email = _a.email, mobile = _a.mobile;
                if (!validate_1.default.mobile(mobile)) return [3 /*break*/, 10];
                return [4 /*yield*/, user_2.userModel.findOne({ mobile: mobile })];
            case 2:
                userMobileExist = _b.sent();
                if (!userMobileExist) return [3 /*break*/, 8];
                return [4 /*yield*/, user_2.OTPModel.findOneAndRemove({ mobile: mobile })];
            case 3:
                _b.sent();
                newOTP = String(otp_1.default.generateOTP);
                saveOtp = new user_2.OTPModel({
                    mobile: mobile,
                    id: userMobileExist._id,
                    otp: newOTP,
                    creationDate: Date.now(),
                    expiryDate: Date.now(),
                });
                _b.label = 4;
            case 4:
                _b.trys.push([4, 6, , 7]);
                return [4 /*yield*/, saveOtp.save()];
            case 5:
                _b.sent();
                return [3 /*break*/, 7];
            case 6:
                error_2 = _b.sent();
                res.status(400).json({
                    status: message_1.StatusMessages.ERROR,
                    message: error_2
                });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/, res.status(200).json({
                    status: message_1.StatusMessages.SUCCESS,
                    message: message_1.Messages.OTP_SENT_TO_MOBILE + " " + userMobileExist.mobile,
                    data: [{
                            mobile: mobile
                        }]
                })];
            case 8: return [2 /*return*/, res.status(401).json({
                    status: message_1.StatusMessages.ERROR,
                    message: message_1.Messages.MOBILE_NOT_IN_DB
                })];
            case 9: return [3 /*break*/, 20];
            case 10:
                if (!validate_1.default.email(email)) return [3 /*break*/, 19];
                return [4 /*yield*/, user_2.userModel.findOne({ email: email })];
            case 11:
                userEmailExist = _b.sent();
                if (!userEmailExist) return [3 /*break*/, 17];
                return [4 /*yield*/, user_2.OTPModel.findOneAndRemove({ email: email })];
            case 12:
                _b.sent();
                newOTP = String(otp_1.default.generateOTP);
                saveOtp = new user_2.OTPModel({
                    email: email,
                    id: userEmailExist._id,
                    otp: newOTP,
                    creationDate: Date.now(),
                    expiryDate: Date.now() + 600000,
                });
                _b.label = 13;
            case 13:
                _b.trys.push([13, 15, , 16]);
                return [4 /*yield*/, saveOtp.save()];
            case 14:
                savedOtp = _b.sent();
                return [3 /*break*/, 16];
            case 15:
                error_3 = _b.sent();
                res.status(400).json({
                    status: message_1.StatusMessages.ERROR,
                    message: error_3
                });
                return [3 /*break*/, 16];
            case 16:
                mailer_1.sendPlainMail({
                    from: process.env.MAILER_SENT_FROM,
                    to: userEmailExist.email,
                    subject: 'OTP for authentication NAT-Prot',
                    text: "OTP for veification is " + newOTP,
                });
                cmOTP = newOTP;
                // res.status(200).send(`<h1 id="updatedOTP">${newOTP}</h1>`);
                return [2 /*return*/, res.status(200).json({
                        status: message_1.StatusMessages.SUCCESS,
                        message: message_1.Messages.OTP_SENT_TO_EMAIL + " " + userEmailExist.email,
                        data: [{
                                email: email
                            }]
                    })];
            case 17: return [2 /*return*/, res.status(401).json({ status: message_1.StatusMessages.ERROR, message: message_1.Messages.EMAIL_NOT_IN_DB })];
            case 18: return [3 /*break*/, 20];
            case 19: return [2 /*return*/, res.status(401).json({ status: message_1.StatusMessages.ERROR, message: message_1.Messages.INVALID_FORMAT })];
            case 20: return [2 /*return*/];
        }
    });
}); };
exports.forgotPassword = forgotPassword;
var validateOTP = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error, _a, otp, email, mobile, getUserOTP, getOTP, temp_Id, resetPASS, error_4, getUserOTP, getOTP, temp_Id, resetPASS, error_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                error = auth_1.validateOTPApiValidation(req.body).error;
                if (!error) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(403).json({
                        status: message_1.StatusMessages.ERROR,
                        message: error.details[0].message
                    })];
            case 1:
                _a = req.body, otp = _a.otp, email = _a.email, mobile = _a.mobile;
                if (!(email && validate_1.default.email(email) && validate_1.default.otp(otp))) return [3 /*break*/, 12];
                return [4 /*yield*/, user_2.OTPModel.findOne({ email: email })];
            case 2:
                getUserOTP = _b.sent();
                getOTP = getUserOTP ? getUserOTP.otp : '';
                if (!(validate_1.default.otp(getOTP) && getOTP === otp)) return [3 /*break*/, 10];
                if (!validate_1.default.otpExpiry(getUserOTP.expiryDate)) return [3 /*break*/, 8];
                return [4 /*yield*/, user_2.OTPModel.findOneAndRemove({ email: email })];
            case 3:
                _b.sent();
                temp_Id = tempId_1.default();
                resetPASS = new user_2.OTPModel({
                    email: email,
                    otp: getOTP,
                    temp_id: temp_Id,
                    creationDate: Date.now(),
                    expiryDate: Date.now() + 300000,
                });
                _b.label = 4;
            case 4:
                _b.trys.push([4, 6, , 7]);
                return [4 /*yield*/, resetPASS.save()];
            case 5:
                _b.sent();
                return [3 /*break*/, 7];
            case 6:
                error_4 = _b.sent();
                return [2 /*return*/, res.status(400).json({ status: message_1.StatusMessages.ERROR, message: error_4 })];
            case 7: return [2 /*return*/, res.status(200).json({ status: message_1.StatusMessages.SUCCESS, message: message_1.Messages.OTP_MATCHED, data: [{ email: email, temp_id: temp_Id }] })];
            case 8: return [2 /*return*/, res.status(400).json({ status: message_1.StatusMessages.ERROR, message: message_1.Messages.OTP_EXPIRED })];
            case 9: return [3 /*break*/, 11];
            case 10: return [2 /*return*/, res.status(400).json({ message: message_1.Messages.OTP_NOT_MATCHED, status: message_1.StatusMessages.ERROR })];
            case 11: return [3 /*break*/, 24];
            case 12:
                if (!(mobile && validate_1.default.mobile(mobile) && validate_1.default.otp(otp))) return [3 /*break*/, 23];
                return [4 /*yield*/, user_2.OTPModel.findOne({ mobile: mobile })];
            case 13:
                getUserOTP = _b.sent();
                getOTP = getUserOTP ? getUserOTP.otp : '';
                if (!(validate_1.default.otp(getOTP) && getOTP === otp)) return [3 /*break*/, 21];
                if (!validate_1.default.otpExpiry(getUserOTP.expiryDate)) return [3 /*break*/, 19];
                return [4 /*yield*/, user_2.OTPModel.findOneAndRemove({ mobile: mobile })];
            case 14:
                _b.sent();
                temp_Id = tempId_1.default();
                resetPASS = new user_2.OTPModel({
                    mobile: mobile,
                    otp: getOTP,
                    temp_id: temp_Id,
                    creationDate: Date.now(),
                    expiryDate: Date.now() + 300000,
                });
                _b.label = 15;
            case 15:
                _b.trys.push([15, 17, , 18]);
                return [4 /*yield*/, resetPASS.save()];
            case 16:
                _b.sent();
                return [3 /*break*/, 18];
            case 17:
                error_5 = _b.sent();
                return [2 /*return*/, res.status(400).json({ status: message_1.StatusMessages.ERROR, message: error_5 })];
            case 18: return [2 /*return*/, res.status(200).json({ status: message_1.StatusMessages.SUCCESS, message: message_1.Messages.OTP_MATCHED, data: [{ mobile: mobile, temp_id: temp_Id }] })];
            case 19: return [2 /*return*/, res.status(400).json({ status: message_1.StatusMessages.ERROR, message: message_1.Messages.OTP_EXPIRED })];
            case 20: return [3 /*break*/, 22];
            case 21: return [2 /*return*/, res.status(400).json({ status: message_1.StatusMessages.ERROR, message: message_1.Messages.OTP_NOT_MATCHED })];
            case 22: return [3 /*break*/, 24];
            case 23: return [2 /*return*/, res.status(400).json({ status: message_1.StatusMessages.ERROR, message: message_1.Messages.INVALID_OTP })];
            case 24: return [2 /*return*/];
        }
    });
}); };
exports.validateOTP = validateOTP;
var changePassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error, _a, email, mobile, temp_id, newPass, getUserTempInfo, encryptPass, hashPassword, getUserTempInfo, encryptPass, hashPassword;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                error = auth_1.changePasswordApiValidation(req.body).error;
                if (!error) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(403).json({
                        status: message_1.StatusMessages.ERROR,
                        message: error.details[0].message
                    })];
            case 1:
                _a = req.body, email = _a.email, mobile = _a.mobile, temp_id = _a.temp_id, newPass = _a.newPass;
                if (!(email && temp_id &&
                    validate_1.default.email(email) &&
                    validate_1.default.password(newPass) &&
                    validate_1.default.tempId(temp_id))) return [3 /*break*/, 11];
                return [4 /*yield*/, user_2.OTPModel.findOne({ email: email })];
            case 2:
                getUserTempInfo = _b.sent();
                if (!getUserTempInfo) return [3 /*break*/, 9];
                if (!(getUserTempInfo.temp_id === temp_id &&
                    validate_1.default.otpExpiry(getUserTempInfo.expiryDate))) return [3 /*break*/, 7];
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 3:
                encryptPass = _b.sent();
                return [4 /*yield*/, bcrypt.hash(newPass, encryptPass)];
            case 4:
                hashPassword = _b.sent();
                return [4 /*yield*/, user_2.userModel.findOneAndUpdate({ email: email }, { password: hashPassword })];
            case 5:
                _b.sent();
                // await User.findOne({ email: email });
                return [4 /*yield*/, user_2.OTPModel.findOneAndRemove({ email: email })];
            case 6:
                // await User.findOne({ email: email });
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: message_1.Messages.PASSWORD_CHANGED_SUCCESSFULLY, status: message_1.StatusMessages.SUCCESS })];
            case 7: return [2 /*return*/, res.status(400).json({ message: message_1.Messages.OTP_EXPIRED, status: message_1.StatusMessages.ERROR })];
            case 8: return [3 /*break*/, 10];
            case 9:
                res.status(400).json({
                    status: message_1.StatusMessages.ERROR,
                    message: "No temp id found associated with " + email
                });
                _b.label = 10;
            case 10: return [3 /*break*/, 22];
            case 11:
                if (!(mobile && temp_id && validate_1.default.mobile(mobile) && validate_1.default.password(newPass) && validate_1.default.tempId(temp_id))) return [3 /*break*/, 21];
                return [4 /*yield*/, user_2.OTPModel.findOne({ mobile: mobile })];
            case 12:
                getUserTempInfo = _b.sent();
                if (!getUserTempInfo) return [3 /*break*/, 19];
                if (!(getUserTempInfo.temp_id === temp_id && validate_1.default.otpExpiry(getUserTempInfo.expiryDate))) return [3 /*break*/, 17];
                return [4 /*yield*/, bcrypt.genSalt(10)];
            case 13:
                encryptPass = _b.sent();
                return [4 /*yield*/, bcrypt.hash(newPass, encryptPass)];
            case 14:
                hashPassword = _b.sent();
                return [4 /*yield*/, user_2.userModel.findOneAndUpdate({ mobile: mobile }, { password: hashPassword })];
            case 15:
                _b.sent();
                // await User.findOne({ email: email });
                return [4 /*yield*/, user_2.OTPModel.findOneAndRemove({ mobile: mobile })];
            case 16:
                // await User.findOne({ email: email });
                _b.sent();
                return [2 /*return*/, res.status(200).json({ status: message_1.StatusMessages.SUCCESS, message: message_1.Messages.PASSWORD_CHANGED_SUCCESSFULLY })];
            case 17: return [2 /*return*/, res.status(400).json({ status: message_1.StatusMessages.ERROR, message: message_1.Messages.OTP_SESSION_EXPIRED })];
            case 18: return [3 /*break*/, 20];
            case 19:
                res.status(400).json({
                    status: message_1.StatusMessages.ERROR,
                    message: 'temp_id has been disabled please try again'
                });
                _b.label = 20;
            case 20: return [3 /*break*/, 22];
            case 21: return [2 /*return*/, res.status(400).json({ status: message_1.StatusMessages.ERROR, message: 'Data format does not match' })];
            case 22: return [2 /*return*/];
        }
    });
}); };
exports.changePassword = changePassword;
var viewOTP = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.send("<h1 id=\"viewOTP\">" + cmOTP + "</h1>");
        return [2 /*return*/];
    });
}); };
exports.viewOTP = viewOTP;
