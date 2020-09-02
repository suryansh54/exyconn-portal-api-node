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
var user_1 = require("../dbModals/user");
var message_1 = require("../utils/enums/message");
var otpVerification_1 = require("../utils/otpVerification");
var validate_1 = __importDefault(require("../utils/validate"));
var createAlternateNumberOTP = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, mobile, user, otpCreated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.userId;
                if (!userID) return [3 /*break*/, 6];
                mobile = req.body.mobile;
                if (!validate_1.default.mobile(mobile)) return [3 /*break*/, 5];
                return [4 /*yield*/, user_1.userModel.findOne({ _id: userID })];
            case 1:
                user = _a.sent();
                if (!(mobile !== user.mobile)) return [3 /*break*/, 3];
                return [4 /*yield*/, otpVerification_1.otpCreation(user.email, mobile, userID)];
            case 2:
                otpCreated = _a.sent();
                if (otpCreated) {
                    res.status(message_1.StatusCode.SUCCESS).json({
                        status: message_1.StatusMessages.SUCCESS,
                        message: message_1.Messages.OTP_SENT_TO_EMAIL + " " + user.email,
                    });
                }
                else {
                    res.status(400).json({
                        status: message_1.StatusMessages.ERROR,
                        message: message_1.Messages.OTP_NOT_SENT
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                res.status(400).json({
                    status: message_1.StatusMessages.ERROR,
                    message: message_1.Messages.SAME_MOBILE_NUMBER
                });
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                res.status(400).json({
                    status: message_1.StatusMessages.ERROR,
                    message: message_1.Messages.INVALID_NUMBER
                });
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.createAlternateNumberOTP = createAlternateNumberOTP;
var validateAlternateNumberOTP = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, otp, result, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.userId;
                if (!userID) return [3 /*break*/, 7];
                otp = req.body.otp;
                return [4 /*yield*/, otpVerification_1.otpValidation(userID, otp)];
            case 1:
                result = _a.sent();
                if (!(result.code === 1)) return [3 /*break*/, 3];
                return [4 /*yield*/, user_1.OTPModel.deleteMany({ id: userID })];
            case 2:
                _a.sent();
                res.status(400).json({
                    status: message_1.StatusMessages.ERROR,
                    message: message_1.Messages.OTP_EXPIRED
                });
                _a.label = 3;
            case 3:
                if (result.code === 2) {
                    res.status(400).json({
                        status: message_1.StatusMessages.ERROR,
                        message: message_1.Messages.OTP_NOT_MATCHED
                    });
                }
                if (!(result.code === 3)) return [3 /*break*/, 6];
                return [4 /*yield*/, user_1.userModel.findOneAndUpdate({ _id: userID }, { alternate_no: result.number })];
            case 4:
                user = _a.sent();
                return [4 /*yield*/, user.save()];
            case 5:
                _a.sent();
                res.status(200).json({
                    status: message_1.StatusMessages.SUCCESS,
                    message: message_1.Messages.OTP_MATCHED
                });
                _a.label = 6;
            case 6:
                if (result.code === 4) {
                    res.status(200).json({
                        status: message_1.StatusMessages.ERROR,
                        message: message_1.Messages.FAILED_OTP_VERIFICATION
                    });
                }
                if (result.code === 5) {
                    res.status(message_1.StatusCode.NOT_FOUND).json({
                        status: message_1.StatusMessages.ERROR,
                        mesage: message_1.Messages.INVALID_OTP
                    });
                }
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.validateAlternateNumberOTP = validateAlternateNumberOTP;
