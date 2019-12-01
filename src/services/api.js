import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apilman.herokuapp.com'
});

export default api;
