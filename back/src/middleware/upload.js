import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, './uploads');
   },

   filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
   },
});

const upload = multer({
   storage,
   limits: { fileSize: 1e7 } // 10 mb
});

export const uploadSingle = upload.single('media');
