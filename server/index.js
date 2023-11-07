import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import router from './routes/auth.js';
import privateRouter from './routes/private.js';
import { connectDB } from './config/db.js';
import errorHandler from './middlewares/error.js';

config();
connectDB();

const port = process.env.PORT || 9999;

const app = express();
app.use(cors({ credentials: true, origin: process.env.ORIGIN }));
app.use(express.json());
app.use('/api', router);
app.use('/api/private', privateRouter);
app.use(errorHandler); // Should be last of the middlewares

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged error ${err}`);
  server.close(() => process.exit(1));
});
