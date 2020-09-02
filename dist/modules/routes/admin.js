"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Core modules
var express_1 = __importDefault(require("express"));
// Controller
var admin_1 = require("../controllers/admin");
var access_1 = require("../controllers/access");
var token_1 = require("../utils/token");
var router = express_1.default.Router();
router.get('/user/all', token_1.verifyToken, access_1.allowIfLoggedin, access_1.grantAccess('read', 'getAllUsers'), admin_1.userList);
router.get('/user/all/delete', token_1.verifyToken, access_1.allowIfLoggedin, access_1.grantAccess('read', 'getAllUsers'), admin_1.allUserDelete);
exports.default = router;
