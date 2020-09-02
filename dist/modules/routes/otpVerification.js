"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var token_1 = require("../utils/token");
var express = require('express');
var router = express.Router();
var otpVerification_1 = require("../controllers/otpVerification");
router.route('/createAlternateNumberOTP').post(token_1.verifyToken, otpVerification_1.createAlternateNumberOTP);
router.route('/validateAlternateNumberOTP').post(token_1.verifyToken, otpVerification_1.validateAlternateNumberOTP);
exports.default = router;
