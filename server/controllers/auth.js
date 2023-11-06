import User from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';

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
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password.', 400));
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    return res.status(200).json({
      success: true,
      token: 'token',
    });
  } catch (err) {
    return next(new ErrorResponse(err.message, 500));
  }
};

export const forgotPassword = (req, res, next) => {
  res.send('Forgot password route');
};

export const resetPassword = (req, res, next) => {
  res.send('Reset password route');
};
