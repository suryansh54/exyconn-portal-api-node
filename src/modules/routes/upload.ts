const path = require('path');
const multer = require('multer');

// Core modules
import express from 'express';

// Controllers
import { uploadReq } from '../controllers/upload';


const DIR = 'uploads';
const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: any) => {
    cb(null, DIR);
  },
  filename: (req: any, file: any, cb: any) => {
    cb(null, file.fieldname + '-' + Date.now() + '' + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const router = express.Router();
router.post('/upload', upload.single('photo'), uploadReq);

export default router;
