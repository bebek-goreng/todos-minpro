import express from 'express';
import { userRoutes } from './user-routes.js';
import { todoRoutes } from './todo-routes.js';

export const router = express.Router();

router.use('/api/v1', userRoutes);
router.use('/api/v1', todoRoutes);
