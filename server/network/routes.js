import { config } from 'dotenv';
import { isAuthenticated } from '../middlewares/auth.js';
import { authRouter, userRouter } from '../components/index.js';

config();

const apiVersion = process.env.API_VERSION;
const authVersion = '/auth';

export const authRoutes = (app) => {
  app.use(authVersion, authRouter);
};

export const userRoutes = (app) => {
  app.use(`${apiVersion}/users`, isAuthenticated, userRouter);
};
