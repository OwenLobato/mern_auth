import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import router from './routes/userRoutes.js';

config();
const app = express();

const mongoUri = process.env.MONGODB_URI;
const port = process.env.PORT || 9999;

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port);
    console.log(`DB is connected and listen on port ${port}`);
  })
  .catch((err) => console.log(err));

app.use('/api', router);
