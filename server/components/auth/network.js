import express from 'express';
import {
  register,
  login,
  forgotPassword,
  resetPassword,
} from './controller.js';
import { success, error } from '../../network/response.js';

const authRouter = express.Router();

authRouter.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  register(username, email, password)
    .then((userData) => {
      return success(req, res, 201, 'User created successfully', userData);
    })
    .catch((err) => {
      return error(req, res, 500, 'Error registering user', err);
    });
});

authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;

  login(email, password)
    .then((userData) => {
      return success(req, res, 200, 'User login successful', userData);
    })
    .catch((err) => {
      return error(req, res, 500, 'Error signing in', err);
    });
});

authRouter.post('/forgotPassword', (req, res) => {
  const { email } = req.body;

  forgotPassword(email)
    .then(() => {
      return success(
        req,
        res,
        200,
        'Password request sent to email successfully'
      );
    })
    .catch((err) => {
      return error(req, res, 500, 'Error sending email', err);
    });
});

authRouter.put('/resetPassword/:resetToken', (req, res) => {
  const { password } = req.body;
  const { resetToken } = req.params;

  resetPassword(password, resetToken)
    .then(() => {
      return success(req, res, 201, 'Password reset successfully');
    })
    .catch((err) => {
      return error(req, res, 500, 'Error resetting password', err);
    });
});

export default authRouter;
