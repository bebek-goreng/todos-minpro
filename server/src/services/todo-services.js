import { TodoRepositories } from "../repositories/todo-repositories.js";

export class TodoServices {
    static async getAll(params) {
        const data = await TodoRepositories.getAll(params);

        if (!data) {
            throw { status: 404, message: 'failed to get data' }
        }

        return data;
    }

    static async getOne(params) {
        if (!params) {
            throw { status: 400, message: 'params id required' }
        }

        const data = await TodoRepositories.getTodo(params);

        if (!data) {
            throw { status: 404, message: 'failed to get details todo, todo not found' }
        }

        return data;
    }

    static async createTodo(params) {
        if (!params.userId && !params.title) {
            throw { status: 400, message: 'invalid input, userId and title required' }
        }

        const data = await TodoRepositories.createTodo(params);

        if (!data) {
            throw { status: 400, message: 'failed to create new todo' }
        }

        return data;

    }

    static async update(params) {
        if (!params.id) {
            throw { status: 400, message: 'invalid input, id (todo) required' }
        }

        const data = await TodoRepositories.update(params);

        if (!data) {
            throw { status: 400, message: 'failed to update todo' }
        }

        return data;
    }

    static async delete(params) {
        if (!params) {
            throw { status: 400, message: 'invalid input, id (todo) required' }
        }

        const data = await TodoRepositories.delete(params);
    }
}