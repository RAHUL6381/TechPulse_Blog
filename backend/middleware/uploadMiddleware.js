import os from 'os';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

// Use /tmp directory for serverless environments
const uploadDir = path.join(os.tmpdir(), 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

export const upload = multer({ storage: storage });