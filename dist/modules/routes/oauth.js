"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Core modules
var express_1 = __importDefault(require("express"));
// Middlewares
var token_1 = require("../utils/token");
// Controllers
var oauth_1 = require("../controllers/oauth");
var router = express_1.default.Router();
router.post('/google', token_1.oAuthGoogleTokenVerify, oauth_1.oAuthGoogle);
router.post('/facebook', token_1.oAuthFacebookTokenVerify, oauth_1.oAuthFacebook);
exports.default = router;
