import { config } from 'dotenv';
import { isAuthenticated } from '../middlewares/auth.js';
import authRouter from '../components/auth/network.js';
import userRouter from '../components/user/network.js';

config();

const apiVersion = process.env.API_VERSION;
const authVersion = '/auth';

export const authRoutes = (app) => {
  app.use(authVersion, authRouter);
};

export const userRoutes = (app) => {
  app.use(`${apiVersion}/users`, isAuthenticated, userRouter);
};
