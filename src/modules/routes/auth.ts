// Core modules
import express from 'express';

// Controller
import { login, signup, forgotPassword, validateOTP, changePassword, viewOTP } from '../controllers/auth';

const router = express.Router();
router.post('/token', login);
router.post('/register', signup);
router.post('/forgot-password', forgotPassword);
router.post('/validate-otp', validateOTP);
router.post('/change-password', changePassword);

router.get('/view-otp', viewOTP);

export default router;
