import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apilman.herokuapp.com'
}, {headers: {'content-type': 'application/json'}});

export default api;
