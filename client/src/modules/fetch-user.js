import { userInstance } from "@/libs/axios/axios-instance";

const login = async (data) => {
    try {
        const response = await userInstance.post('/login', data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

const register = async (data) => {
    try {
        const response = await userInstance.post('/register', data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error.response ? error.response.data : error.message);
        throw error;
    }
}

export {
    login,
    register
}