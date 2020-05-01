import axios from 'axios';
/* request pre-processing */
axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export const AxiosBe = axios.create({
    baseURL: 'http://127.0.0.1:3030',
});