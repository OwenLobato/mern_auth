import express from 'express';
import {
  getUser,
  login,
  refreshToken,
  signup,
  verifyToken,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', verifyToken, getUser);
router.get('/refresh', refreshToken, verifyToken, getUser);

export default router;
