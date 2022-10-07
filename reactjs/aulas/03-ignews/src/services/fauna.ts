import { Client } from 'faunadb';

// fazendo a conexão com o banco de dados
export const fauna = new Client({
  secret: process.env.FAUNADB_KEY
});