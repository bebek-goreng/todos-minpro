import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

export const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(morgan('dev'));

