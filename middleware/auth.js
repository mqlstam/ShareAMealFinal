// middleware/auth.js

import jwt from 'jsonwebtoken';
import config from '../util/config.js';


const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    req.user = { ...decoded, userId: +decoded.userId };  // Convert userId to a number
    next();
  });
};

export default authenticate;