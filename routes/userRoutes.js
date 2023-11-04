import express from 'express';
import { login, signup, verifyToken } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', verifyToken);

export default router;
