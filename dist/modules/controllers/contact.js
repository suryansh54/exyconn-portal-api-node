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
Object.defineProperty(exports, "__esModule", { value: true });
// Utils
var message_1 = require("../utils/enums/message");
// dbModel
var contact_1 = require("../dbModals/contact");
// model
var contact_2 = require("../modals/contact");
// controller functions
var submitContactQuery = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, _a, subject, description, newContactQuery, saveNewContactQuery, query;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userId = req.userId;
                if (!userId) return [3 /*break*/, 2];
                _a = req.body, subject = _a.subject, description = _a.description;
                newContactQuery = new contact_2.ReqContactQueryModel({
                    subject: subject,
                    description: description,
                    userID: userId,
                    incidentID: Date.now(),
                });
                return [4 /*yield*/, contact_1.contactQuery.create(newContactQuery)];
            case 1:
                saveNewContactQuery = _b.sent();
                if (saveNewContactQuery) {
                    query = new contact_2.ContactQueryModel(saveNewContactQuery);
                    return [2 /*return*/, res.status(201).json({
                            status: message_1.StatusMessages.SUCCESS,
                            message: message_1.Messages.QUERY_SUBMITTED,
                            data: [query],
                        })];
                }
                else {
                    res.status(400).json({
                        status: message_1.StatusMessages.ERROR,
                        messege: message_1.Messages.UNABLE_TO_CREATE_QUERY,
                    });
                }
                _b.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
exports.submitContactQuery = submitContactQuery;
var getContactQueryById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, contactQuery, resContactQuery;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.userId;
                if (!userId) return [3 /*break*/, 2];
                return [4 /*yield*/, contact_1.contactQuery.findOne({
                        incidentID: req.body.incidentID,
                        userID: userId,
                    })];
            case 1:
                contactQuery = _a.sent();
                if (contactQuery) {
                    resContactQuery = new contact_2.ContactQueryResponseModel(contactQuery);
                    return [2 /*return*/, res.status(200).json({
                            status: message_1.StatusMessages.SUCCESS,
                            message: message_1.Messages.QUERY_FOUND,
                            data: [resContactQuery],
                        })];
                }
                else {
                    res.status(400).json({
                        status: message_1.StatusMessages.ERROR,
                        message: message_1.Messages.INVALID_INCIDENT_ID
                    });
                }
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
exports.getContactQueryById = getContactQueryById;
var getContactQueryList = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, contactQueryList, list_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.userId;
                if (!userId) return [3 /*break*/, 2];
                return [4 /*yield*/, contact_1.contactQuery.find({ userID: userId }).select('-_id -__v')];
            case 1:
                contactQueryList = _a.sent();
                list_1 = [];
                contactQueryList.map(function (el) {
                    list_1.push(new contact_2.ContactQueryResponseModel(el));
                });
                if (contactQueryList) {
                    return [2 /*return*/, res.status(200).json({
                            status: message_1.StatusMessages.SUCCESS,
                            message: message_1.Messages.LIST_EXTRACTED,
                            data: list_1,
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({
                            status: message_1.StatusMessages.ERROR,
                            messege: message_1.Messages.NO_QUERY_EXIST,
                        })];
                }
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
exports.getContactQueryList = getContactQueryList;
