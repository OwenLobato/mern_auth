import express from 'express';
import {
  getUser,
  login,
  signup,
  verifyToken,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', verifyToken, getUser);

export default router;
