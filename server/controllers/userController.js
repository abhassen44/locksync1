const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const BASE_URL = process.env.BASE_URL;

const registerUser = async (req, res) => {
  const { username, name, age, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ username, name, age, email, password: hashedPassword });
    await user.save();

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true }).status(201).json({ 
      msg: 'User registered successfully',
      profileUrl: `${BASE_URL}/user/profile/${user._id}`
    });
  } catch (err) {
    console.error("Error in registration:", err.message);
    res.status(500).send('Server error');
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true }).json({ 
      msg: 'Logged in successfully',
      dashboardUrl: `${BASE_URL}/dashboard`
    });
  } catch (err) {
    console.error("Error in login:", err.message);
    res.status(500).send('Server error');
  }
};

const shareAccount = async (req, res) => {
  const { email, account } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    if (!user.sharedAccounts.includes(account)) {
      user.sharedAccounts.push(account);
      await user.save();
    }

    res.status(200).json({ 
      msg: 'Account shared successfully',
      sharedAccountsUrl: `${BASE_URL}/user/${user._id}/shared-accounts`
    });
  } catch (err) {
    console.error("Error in sharing account:", err.message);
    res.status(500).send('Server error');
  }
};

const viewSharedAccounts = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.status(200).json({ 
      user: user.email, 
      sharedAccounts: user.sharedAccounts,
      profileUrl: `${BASE_URL}/user/profile/${user._id}`
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const revokeAccount = async (req, res) => {
  const { account } = req.body;

  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(400).json({ msg: 'User not found' });

    if (!user.sharedAccounts.includes(account)) {
      return res.status(400).json({ msg: 'Account not found in shared list' });
    }

    user.sharedAccounts = user.sharedAccounts.filter(acc => acc !== account);
    await user.save();

    res.status(200).json({ 
      msg: 'Account access revoked successfully',
      updatedSharedAccountsUrl: `${BASE_URL}/user/${user._id}/shared-accounts`
    });
  } catch (err) {
    console.error("Error in revoking account:", err.message);
    res.status(500).send('Server error');
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { registerUser, loginUser, shareAccount, viewSharedAccounts, revokeAccount, logoutUser };
