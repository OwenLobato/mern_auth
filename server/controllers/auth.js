import User from '../models/User.js';

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Please provide email and password.',
    });
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return res.status(404).json({
        success: false,
        error: 'Invalid credentials',
      });
    }

    return res.status(200).json({
      success: true,
      token: 'token',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

export const forgotPassword = (req, res, next) => {
  res.send('Forgot password route');
};

export const resetPassword = (req, res, next) => {
  res.send('Reset password route');
};
