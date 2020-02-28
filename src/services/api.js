import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.9:5000'//'https://apilman.herokuapp.com'
}, {headers: {'content-type': 'application/json'}});

export default api;
