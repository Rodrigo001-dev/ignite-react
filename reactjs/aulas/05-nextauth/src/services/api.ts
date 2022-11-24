import axios from 'axios';
import { parseCookies } from 'nookies';

const cookies = parseCookies();

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    // aqui eu configuro os headers defaults, os headers que vão vir configurados
    // desde o primeiro momento que eu inicializar a minha aplicação
    Authorization: `Bearer ${cookies['nextauth.token']}`
  }
});