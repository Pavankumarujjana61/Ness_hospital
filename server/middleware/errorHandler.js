import multer from 'multer';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: 'Upload limit or parameter error: ' + err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message });
  }
  next();
};
