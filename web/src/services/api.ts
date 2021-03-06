import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
})


api.interceptors.response.use((response) => new Promise((resolve, reject) => {
    resolve(response);
}),
    (error) => {
        if (!error.response) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
        if (error.response.status === 403) {
            localStorage.removeItem('web:token');
            window.location.href = '/login';
        } else if (error.response.status === 403) {
            localStorage.removeItem('web:token');
            window.location.href = '/login';
        } else {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }

    }

)

export default api;