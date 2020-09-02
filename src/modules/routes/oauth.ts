// Core modules
import express from 'express';

// Middlewares
import { oAuthGoogleTokenVerify, oAuthFacebookTokenVerify } from '../utils/token';

// Controllers
import { oAuthGoogle, oAuthFacebook } from '../controllers/oauth';

const router = express.Router();
router.post('/google', oAuthGoogleTokenVerify, oAuthGoogle);
router.post( '/facebook', oAuthFacebookTokenVerify, oAuthFacebook);

export default router;
