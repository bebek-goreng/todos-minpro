import axios from 'axios';

const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Expires: 0,
};

const createAxiosInstance = (baseURL) => {
    const instance = axios.create({
        baseURL,
        headers,
        timeout: 60 * 1000,
    });

    instance.interceptors.request.use(
        (config) => {
            if (typeof window !== "undefined") {
                const token = localStorage.getItem("token");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
        (response) => response,
        (error) => Promise.reject(error)
    );

    return instance;
};

const todosInstance = createAxiosInstance("http://localhost:8080/api/v1/todos");
const userInstance = createAxiosInstance("http://localhost:8080/api/vi/auth");


export {
    todosInstance,
    userInstance
}