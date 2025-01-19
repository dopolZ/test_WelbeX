import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { connectToDatabase } from './src/models/index.js';
import authRoutes from './src/routes/authRoutes.js';
import entryRoutes from './src/routes/entryRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig.js';

dotenv.config();
connectToDatabase();

const app = express();
const port = process.env.API_PORT;
const __dirname = new URL('.', import.meta.url).pathname;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// авторизация, регистрация
app.use('/auth', authRoutes);

// работа с записями
app.use('/entries', entryRoutes);

app.listen(port, () => {
   console.log(`Сервер запущен, порт: ${port}`);
});
