const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = () => async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(401).json({ msg: 'User not found, authorization denied' });

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
  
};

module.exports = auth;
