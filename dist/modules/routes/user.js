"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Core modules
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
// Utils
var token_1 = require("../utils/token");
// Controllers
var user_1 = require("../controllers/user");
// Secure Routes
router.get('/user', token_1.verifyToken, user_1.getUser);
router.delete('/user', token_1.verifyToken, user_1.deleteUser);
router.put('/user', token_1.verifyToken, user_1.updateUser);
router.post('/validate-password', token_1.verifyToken, user_1.validatePassword);
router.put('/change-password', token_1.verifyToken, user_1.updatePassword);
exports.default = router;
