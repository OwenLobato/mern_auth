import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import router from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

config();
const mongoUri = process.env.MONGODB_URI;
const port = process.env.PORT || 9999;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port);
    console.log(`DB is connected and listen on port ${port}`);
  })
  .catch((err) => console.log(err));
