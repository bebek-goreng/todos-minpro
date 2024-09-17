import { prisma } from '../config/db.js';

export class TodoRepositories {
    static async getAll(params = {}) {
        const data = await prisma.todo.findMany({
            where: params
        });

        return data;
    }

    static async getTodo(params) {
        const data = await prisma.todo.findUnique({
            where: {
                id: params
            }
        });

        return data;
    }

    static async createTodo(params) {
        const { userId, data: { title, description, dueDate, dueTime, category } } = params;
        const data = await prisma.todo.create({
            data: {
                userId: userId,
                title: title,
                description: description,
                dueDate: dueDate,
                dueTime: dueTime,
                category: category
            }
        });

        return data;
    }

    static async update(params) {
        const { id, data: { title, description, dueDate, dueTime, status } } = params;
        const data = await prisma.todo.update({
            where: {
                id: id
            }, data: {
                title: title,
                description: description,
                dueDate: dueDate,
                dueTime: dueTime,
                status: status
            }
        });

        return data;
    }

    static async delete(params) {
        const data = await prisma.todo.delete({
            where: {
                id: params
            }
        });
    }
}