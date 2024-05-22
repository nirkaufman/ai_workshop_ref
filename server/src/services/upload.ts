import multer from 'multer';
import path from 'path';

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(path.dirname(process.cwd()), 'server', 'uploads');
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const fileFilter = (req: any, file: any, cb: any) => {
  cb(null, true);
};

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});
