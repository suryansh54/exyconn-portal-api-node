// Core modules
import express from 'express';

// Controller
import { userList, allUserDelete } from '../controllers/admin';
import { allowIfLoggedin, grantAccess } from '../controllers/access';
import { verifyToken } from '../utils/token';

const router = express.Router();
router.get('/user/all', verifyToken, allowIfLoggedin, grantAccess('read', 'getAllUsers'), userList);
router.get('/user/all/delete', verifyToken, allowIfLoggedin, grantAccess('read', 'getAllUsers'), allUserDelete);

export default router;
