import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // ajuste para a porta do seu backend se necessário
});