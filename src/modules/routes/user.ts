
// Core modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Utils
import { verifyToken } from '../utils/token';

// Controllers
import { getUser, deleteUser, updateUser, validatePassword, updatePassword } from '../controllers/user';

// Validations
import { validateUpdateBodyRequest } from '../validations/user';

// Secure Routes
router.get('/user', verifyToken, getUser);
router.delete('/user', verifyToken, deleteUser);
router.put('/user', verifyToken, updateUser);
router.post('/validate-password', verifyToken, validatePassword);
router.put('/change-password', verifyToken, updatePassword);

export default router;
