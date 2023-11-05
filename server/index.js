import { config } from 'dotenv';

config();
const mongoUri = process.env.MONGODB_URI;
const port = process.env.PORT || 9999;

console.log("HOLA MUNDO");