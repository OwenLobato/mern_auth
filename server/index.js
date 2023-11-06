import express from 'express';
import { config } from 'dotenv';
import router from './routes/auth.js';

config();
const port = process.env.PORT || 9999;

const app = express();
app.use(express.json());
app.use('/api', router);

app.listen(port, () => console.log(`Server running on port ${port}`));
