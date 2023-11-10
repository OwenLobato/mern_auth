import crypto from 'crypto';
import { ORIGIN_PATH } from '../../index.js';
import User from '../../models/User.js';
import { customError } from '../../network/response.js';
import sendEmail from '../../utils/sendEmail.js';

export const register = (username, email, password) => {
  return new Promise(async (resolve, reject) => {
    if (!username || !email || !password) {
      reject(customError(400, 'Please provide the complete data'));
    }

    try {
      const user = await User.create({
        username,
        email,
        password,
      });

      resolve(sendToken(user));
    } catch (err) {
      reject(err);
    }
  });
};

export const login = (email, password) => {
  return new Promise(async (resolve, reject) => {
    if (!email || !password) {
      reject(customError(400, 'Please provide email and password'));
    }

    try {
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        reject(customError(401, 'Invalid credentials'));
      }

      const isMatch = await user.matchPasswords(password);
      if (!isMatch) {
        reject(customError(401, 'Invalid credentials'));
      }

      resolve(sendToken(user));
    } catch (err) {
      reject(customError(500, err.message));
    }
  });
};

export const forgotPassword = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        reject(customError(404, 'Email could not be sent'));
      }

      const resetToken = user.getResetPasswordToken();

      await user.save();

      const resetUrl = `${ORIGIN_PATH}/#/passwordReset/${resetToken}`;
      const message = `
        <h1 style="font-size: 24px; color: #333; text-align: center;">You have requested a password reset</h1>
        <p style="font-size: 16px; color: #555; text-align: center;">Please go to this link to reset your password</p>
        <p style="text-align: center;">
          <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">Reset Password</a>
        </p>
      `;

      try {
        await sendEmail({
          to: user.email,
          subject: 'Password reset request',
          text: message,
        });

        resolve();
      } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        reject(customError(500, 'Email could not be sent'));
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const resetPassword = (password, resetToken) => {
  return new Promise(async (resolve, reject) => {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    try {
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
      if (!user) {
        reject(customError(400, 'Invalid reset token'));
      }

      user.password = password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

const sendToken = (user) => {
  const token = user.getSignedToken();
  return { user, token };
};
