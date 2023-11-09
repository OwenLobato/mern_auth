import express from 'express';
import { getPrivateData } from './controller.js';
import { success, error } from '../../network/response.js';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  getPrivateData()
    .then((userData) => {
      return success(
        req,
        res,
        200,
        userData.length > 0
          ? 'All users show successfully'
          : 'No users on database',
        userData
      );
    })
    .catch((err) => {
      return error(req, res, 500, 'Error getting user data', err);
    });
});

export default userRouter;
