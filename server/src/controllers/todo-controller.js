import { TodoServices } from "../services/todo-services.js";

export class TodoControllers {
    static async getAll(req, res, next) {
        try {
            const params = req.body;
            const data = await TodoServices.getAll(params);

            res.status(200).json({
                message: 'ok',
                data: data
            });
        } catch (error) {
            next(error)
        }
    }

    static async getOne(req, res, next) {
        try {
            const data = req.params.id;
            const todo = await TodoServices.getOne(data);

            res.status(200).json({
                message: 'ok',
                data: todo
            });
        } catch (error) {
            next(error);
        }
    }

    static async createTodo(req, res, next) {
        try {
            const params = {
                userId: req.user.id,
                data: req.body
            };

            const todo = await TodoServices.createTodo(params);

            res.status(200).json({
                message: 'ok',
                data: todo
            });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const data = {
                id: req.params.id,
                data: req.body
            }
            const todo = await TodoServices.update(data);

            res.status(200).json({
                message: 'ok',
                data: todo
            });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const id = req.params.id;
            const todo = await TodoServices.delete(id);

            res.status(200).json({
                message: 'ok',
                data: todo
            });
        } catch (error) {
            next(error);
        }
    }
}