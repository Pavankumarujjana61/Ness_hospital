import jwt from 'jsonwebtoken';
import { config as appConfig } from '../config/config.js';

export const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Access Denied: No Token Provided' });
  }

  try {
    const verified = jwt.verify(token, appConfig.jwtSecret);
    req.admin = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid Token' });
  }
};
