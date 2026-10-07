import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080', // ajuste para a porta do seu backend se necessário
});