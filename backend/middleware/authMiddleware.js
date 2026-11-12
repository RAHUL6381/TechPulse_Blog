import jwt from 'jsonwebtoken';
import { storage } from '../services/storageService.js';

export const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized access. Administrative bearer token required.'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'techpulse_enterprise_super_secret_jwt_key_2026');
    const user = storage.findUserByEmail(decoded.email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'User belonging to this token no longer exists.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired administrative token.' });
  }
};

export const authorizePublisher = (req, res, next) => {
  if (!['superadmin', 'admin', 'editor', 'publisher'].includes(req.user?.role)) {
    return res.status(403).json({
      success: false,
      message: 'Editorial Publisher or Administrative clearance required.'
    });
  }
  next();
};

export const authorizeAdmin = (req, res, next) => {
  if (!['superadmin', 'admin'].includes(req.user?.role)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Administrator clearance (Highest Privilege Tier) required.'
    });
  }
  next();
};
