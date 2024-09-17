import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router } from './routes/routes.js';
import { errorHandler } from './middlewares/error-handlers.js'

export const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));
app.use(router);
app.use(errorHandler);
