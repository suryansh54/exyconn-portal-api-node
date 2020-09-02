"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require('path');
var multer = require('multer');
// Core modules
var express_1 = __importDefault(require("express"));
// Controllers
var upload_1 = require("../controllers/upload");
var DIR = 'uploads';
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, DIR);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '' + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });
var router = express_1.default.Router();
router.post('/upload', upload.single('photo'), upload_1.uploadReq);
exports.default = router;
