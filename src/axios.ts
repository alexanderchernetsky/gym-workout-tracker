import axios from 'axios';

const API_URL = 'tbc';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {'Content-type': 'application/json; charset=UTF-8'}
});

export default axiosInstance;
