import axios from 'axios';

export const api = axios.create({
  // como a url é a mesma o axios vai reaproveitar a url que já existe da
  // aplicação
  baseURL: '/api'
});