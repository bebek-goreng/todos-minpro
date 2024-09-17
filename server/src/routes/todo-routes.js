import express from 'express';
import { auth } from '../middlewares/auth.js';
import { TodoControllers } from '../controllers/todo-controller.js';

export const todoRoutes = express.Router();

todoRoutes.use(auth);
todoRoutes.get('/todo-details/:id', TodoControllers.getOne);
todoRoutes.get('/todos', TodoControllers.getAll);
todoRoutes.post('/create-todos', TodoControllers.createTodo);
todoRoutes.put('/update-todo/:id', TodoControllers.update);
todoRoutes.delete('/delete/:id', TodoControllers.delete);