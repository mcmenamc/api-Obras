import 'dotenv/config';
import './config/database.js';
import './utils/initialSetup.js';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index.js'; // <--- importar rutas

// inicialización de express
const app = express();

// Middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use('/api', router);

export default app;
