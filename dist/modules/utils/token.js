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
var jwt = require('jsonwebtoken');
var user_1 = require("../dbModals/user");
var message_1 = require("./enums/message");
var jwtOptions = {
    issuer: process.env.TOKEN_ISSUER,
    subject: process.env.TOKEN_SUBJECT,
    audience: process.env.TOKEN_AUDIENCE,
    expiresIn: process.env.TOKEN_EXPIRE_TIME,
    algorithm: process.env.TOKEN_ALGORITHM
};
var verifyToken = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizationToken, tokenType, token, verified, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                authorizationToken = req.headers.authorization;
                if (!!authorizationToken) return [3 /*break*/, 1];
                return [2 /*return*/, res.status(401).json({
                        status: message_1.StatusMessages.ERROR,
                        message: message_1.Messages.NO_AUTHORIZATION_HEADER
                    })];
            case 1:
                if (!(authorizationToken.split(' ').length === 2)) return [3 /*break*/, 7];
                tokenType = authorizationToken.split(' ')[0];
                token = authorizationToken.split(' ')[1];
                if (!(tokenType !== 'Bearer')) return [3 /*break*/, 2];
                return [2 /*return*/, res.status(401).json({
                        status: message_1.StatusMessages.ERROR,
                        message: message_1.Messages.INVALID_TOKEN_TYPE
                    })];
            case 2:
                if (!(token === null || !token)) return [3 /*break*/, 3];
                return [2 /*return*/, res.status(401).json({
                        status: message_1.StatusMessages.ERROR,
                        message: message_1.Messages.UNAUTHORIZED_REQUEST
                    })];
            case 3:
                verified = void 0;
                try {
                    verified = jwt.verify(token, process.env.PRIVATE_KEY, jwtOptions);
                }
                catch (error) {
                    if (error instanceof jwt.JsonWebTokenError) {
                        return [2 /*return*/, res.status(401).json({
                                status: message_1.StatusMessages.ERROR,
                                message: error.message
                            })];
                    }
                    else {
                        return [2 /*return*/, res.status(400).end()];
                    }
                }
                if (!verified._id) return [3 /*break*/, 5];
                req.userId = verified._id;
                req.role = verified.role;
                _a = res.locals;
                return [4 /*yield*/, user_1.userModel.findById(verified._id)];
            case 4:
                _a.loggedInUser = _b.sent();
                next();
                return [3 /*break*/, 6];
            case 5: return [2 /*return*/, res.status(400).json({
                    status: message_1.StatusMessages.ERROR,
                    message: message_1.Messages.INVALID_TOKEN
                })];
            case 6: return [3 /*break*/, 8];
            case 7: return [2 /*return*/, res.status(401).send({
                    status: message_1.StatusMessages.ERROR,
                    message: message_1.Messages.UNAUTHORIZED_REQUEST
                })];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.verifyToken = verifyToken;
var oAuthGoogleTokenVerify = function (req, res, next) {
    next();
};
exports.oAuthGoogleTokenVerify = oAuthGoogleTokenVerify;
var oAuthFacebookTokenVerify = function (req, res, next) {
    next();
};
exports.oAuthFacebookTokenVerify = oAuthFacebookTokenVerify;
var jwtTokenGenerate = function (payload) {
    var token = jwt.sign(payload, process.env.PRIVATE_KEY, jwtOptions);
    return token;
};
exports.jwtTokenGenerate = jwtTokenGenerate;
