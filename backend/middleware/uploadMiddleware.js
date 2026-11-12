import os from 'os';
import path from 'path';
import fs from 'fs';

// Use /tmp directory for serverless environments
const uploadDir = path.join(os.tmpdir(), 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}