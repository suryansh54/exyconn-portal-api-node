"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Core modules
var express_1 = __importDefault(require("express"));
// Controller
var auth_1 = require("../controllers/auth");
var router = express_1.default.Router();
router.post('/token', auth_1.login);
router.post('/register', auth_1.signup);
router.post('/forgot-password', auth_1.forgotPassword);
router.post('/validate-otp', auth_1.validateOTP);
router.post('/change-password', auth_1.changePassword);
router.get('/view-otp', auth_1.viewOTP);
exports.default = router;
