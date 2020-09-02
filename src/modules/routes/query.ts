const express = require('express');

import { submitContactQuery, getContactQueryList, getContactQueryById } from '../controllers/contact';
import { verifyToken } from '../utils/token';


const router = express.Router();

router.route('/contact/submitquery').post(verifyToken, submitContactQuery);
router.route('/contact/queryList').get(verifyToken, getContactQueryList);
router.route('/contact/queryById').post(verifyToken, getContactQueryById);

export default router;
