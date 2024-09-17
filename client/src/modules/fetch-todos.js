import { todosInstance } from "@/libs/axios/axios-instance";

const getAllTodos = async (data) => {
    try {
        const response = await todosInstance.get('/', data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const getDetailsTodos = async (id) => {
    try {
        const response = await todosInstance.get(`/details/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const createTodos = async (data) => {
    try {
        const response = await todosInstance.post('/create', data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const updateTodos = async (id) => {
    try {
        const response = await todosInstance.put(`/update/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const deleleteTodos = async (id) => {
    try {
        const response = await todosInstance.delete(`/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export {
    getAllTodos,
    getDetailsTodos,
    createTodos,
    updateTodos,
    deleleteTodos
}