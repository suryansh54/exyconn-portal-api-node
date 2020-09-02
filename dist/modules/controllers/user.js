"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require('bcryptjs');
// Utils
var message_1 = require("../utils/enums/message");
// Database Modals
var user_1 = require("../dbModals/user");
// Model
var user_2 = require("../modals/user");
var user_3 = require("../validations/user");
var getUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.userId;
                if (!userId) return [3 /*break*/, 2];
                return [4 /*yield*/, user_1.userModel.findOne({ _id: userId })];
            case 1:
                user = _a.sent();
                if (user) {
                    userData = new user_2.UserModels(user);
                    return [2 /*return*/, res.status(200).json({
                            status: message_1.StatusMessages.SUCCESS,
                            message: message_1.Messages.USER_DATA,
                            data: [userData]
                        })];
                }
                else {
                    return [2 /*return*/, res.status(400).json({
                            status: message_1.StatusMessages.ERROR,
                            message: message_1.Messages.UNABLE_TO_SEND_USER_DATA,
                        })];
                }
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
exports.getUser = getUser;
var deleteUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.userId;
                if (!userId) return [3 /*break*/, 2];
                return [4 /*yield*/, user_1.userModel.findOneAndRemove({ _id: userId })];
            case 1:
                user = _a.sent();
                if (user) {
                    userData = new user_2.UserModels(user);
                    return [2 /*return*/, res.status(200).json({
                            status: message_1.StatusMessages.SUCCESS,
                            message: message_1.Messages.USER_DELETED_SUCCESSFULLY,
                            data: [userData]
                        })];
                }
                else {
                    return [2 /*return*/, res.status(400).json({
                            status: message_1.StatusMessages.ERROR,
                            message: message_1.Messages.UNABLE_TO_DELETE_USER,
                        })];
                }
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
var updateUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, userReqBody, error, user, userData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userID = req.userId;
                userReqBody = new user_2.UserUpdate(req.body);
                error = user_3.validateUpdateBodyRequest(userReqBody).error;
                if (error) {
                    return [2 /*return*/, res.status(403).json({
                            status: message_1.StatusMessages.ERROR,
                            message: error.details[0].message
                        })];
                }
                if (!userID) return [3 /*break*/, 2];
                return [4 /*yield*/, user_1.userModel.findOneAndUpdate({ _id: userID }, __assign(__assign({}, userReqBody), { updated_at: Date.now() }))];
            case 1:
                user = _a.sent();
                if (user) {
                    userData = new user_2.UserModels(user);
                    return [2 /*return*/, res.status(200).json({
                            status: message_1.StatusMessages.SUCCESS,
                            message: message_1.Messages.USER_UPDATED_SUCCESSFULLY,
                            data: [userReqBody]
                        })];
                }
                else {
                    return [2 /*return*/, res.status(400).json({
                            status: message_1.StatusMessages.ERROR,
                            message: message_1.Messages.UNABLE_TO_USER_UPDATE
                        })];
                }
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var validatePassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var error, password, userId, user, validPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                error = user_3.validatePasswordApiValidation(req.body).error;
                if (!error) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(403).json({
                        status: message_1.StatusMessages.ERROR,
                        message: error.details[0].message
                    })];
            case 1:
                password = req.body.password;
                userId = req.userId;
                if (!userId) return [3 /*break*/, 4];
                return [4 /*yield*/, user_1.userModel.findOne({ _id: userId })];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 3:
                validPassword = _a.sent();
                if (!validPassword) {
                    return [2 /*return*/, res.status(400).json({
                            status: message_1.StatusMessages.ERROR,
                            message: message_1.Messages.INVALID_PASSWORD,
                            data: [{ userVerified: false }]
                        })];
                }
                else {
                    return [2 /*return*/, res.status(200).json({
                            status: message_1.StatusMessages.SUCCESS,
                            message: message_1.Messages.USER_VERIFIED,
                            data: [{ userVerified: true }]
                        })];
                }
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.validatePassword = validatePassword;
// Update the password new
var updatePassword = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userID, error, _a, password, newPassword, user, validPassword, encryptPass, hashPassword, updatedUser;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userID = req.userId;
                error = user_3.validatePasswordWhileUpdating(req.body).error;
                if (!error) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(403).json({
                        status: message_1.StatusMessages.ERROR,
                        message: error.details[0].message
                    })];
            case 1:
                _a = req.body, password = _a.password, newPassword = _a.newPassword;
                return [4 /*yield*/, user_1.userModel.findOne({ _id: userID })];
            case 2:
                user = _b.sent();
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 3:
                validPassword = _b.sent();
                if (!!validPassword) return [3 /*break*/, 4];
                return [2 /*return*/, res.status(message_1.StatusCode.UNAUTHORIZED).json({
                        status: message_1.StatusMessages.ERROR,
                        message: message_1.Messages.INVALID_PASSWORD
                    })];
            case 4: return [4 /*yield*/, bcrypt.genSalt(10)];
            case 5:
                encryptPass = _b.sent();
                return [4 /*yield*/, bcrypt.hash(newPassword, encryptPass)];
            case 6:
                hashPassword = _b.sent();
                return [4 /*yield*/, user_1.userModel.findOneAndUpdate({ _id: userID }, { password: hashPassword, updated_at: Date.now() })];
            case 7:
                updatedUser = _b.sent();
                if (updatedUser) {
                    return [2 /*return*/, res.status(200).json({
                            status: message_1.StatusMessages.SUCCESS,
                            message: message_1.Messages.PASS_CHANGED_SUCCESS
                        })];
                }
                else {
                    return [2 /*return*/, res.status(400).json({
                            status: message_1.StatusMessages.ERROR,
                            message: message_1.Messages.UNABLE_TO_USER_UPDATE
                        })];
                }
                _b.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.updatePassword = updatePassword;
