import express from 'express';
import { getPrivateData } from '../controllers/private.js';
import { protect } from '../middlewares/auth.js';

const privateRouter = express.Router();

privateRouter.get('/', protect, getPrivateData);

export default privateRouter;
