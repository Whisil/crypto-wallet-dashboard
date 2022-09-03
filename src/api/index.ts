import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
});

Api.defaults.headers.common['Content-Type'] = `application/json`;
Api.defaults.headers.common['Accept'] = `application/json`;

Api.interceptors.response.use(
    (request) => {
        return request;
    },
    (error) => {
        throw error.response;
    }
);

export default Api;