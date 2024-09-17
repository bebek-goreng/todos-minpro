import express from 'express';
import { auth } from '../middlewares/auth.js';
import { TodoControllers } from '../controllers/todo-controller.js';

export const todoRoutes = express.Router();

todoRoutes.use(auth);
todoRoutes.get('/todos/details/:id', TodoControllers.getOne);
todoRoutes.get('/todos', TodoControllers.getAll);
todoRoutes.post('/todos/create', TodoControllers.createTodo);
todoRoutes.put('/todos/update/:id', TodoControllers.update);
todoRoutes.delete('/todos/delete/:id', TodoControllers.delete);