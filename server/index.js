import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { config } from 'dotenv';
import { connectDB } from './config/mongo.js';
import { authRoutes, userRoutes } from './network/routes.js';

config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const buildPath = resolve(dirname(__filename), '../build');
const indexPath = resolve(dirname(__filename), '../build/index.html');

export const ORIGIN_PATH =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_ORIGIN
    : process.env.ORIGIN;

const port = process.env.PORT || 9999;

const app = express();
app.use(express.static(buildPath));
app.use(cors({ credentials: true, origin: ORIGIN_PATH }));
app.use(express.json());
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(indexPath);
});

// ROUTES
authRoutes(app);
userRoutes(app);

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged error ${err}`);
  server.close(() => process.exit(1));
});
