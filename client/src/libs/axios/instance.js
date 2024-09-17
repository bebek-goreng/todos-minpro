import axios from "axios";

const baseURL = 'http://localhost:8000/api/v1';
const instance = axios.create({ baseURL })

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { instance }; 