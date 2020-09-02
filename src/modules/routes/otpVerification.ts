import { verifyToken } from '../utils/token';
const express = require('express');
const router = express.Router();
import { createAlternateNumberOTP, validateAlternateNumberOTP } from '../controllers/otpVerification';

router.route('/createAlternateNumberOTP').post(verifyToken, createAlternateNumberOTP);
router.route('/validateAlternateNumberOTP').post(verifyToken, validateAlternateNumberOTP);

export default router;
