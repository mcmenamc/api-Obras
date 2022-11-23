import 'dotenv/config';
import './config/database.js';
import './utils/initialSetup.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index.js'; // <--- importar rutas
import path from 'path';
import { fileURLToPath } from 'url';
import history from 'connect-history-api-fallback';

// inicialización de express
const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Routes
app.use('/api', router);

app.use(history());
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Static files
app.use('/', express.static(path.join(__dirname, 'public')));

export default app;
